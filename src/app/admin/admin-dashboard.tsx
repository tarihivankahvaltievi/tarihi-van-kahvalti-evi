"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  LogOut,
  Upload,
  Check,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Search,
  ChevronRight,
  Computer,
  Database,
  Volume2,
} from "lucide-react";
import type { MenuData, MenuItem, MenuCategory } from "../menu/menu-storage";

// Helper function to compress images on the client side
const compressImage = (
  file: File
): Promise<{
  blob: Blob;
  filename: string;
  originalSize: number;
  newSize: number;
  compressed: boolean;
}> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve({
        blob: file,
        filename: file.name,
        originalSize: file.size,
        newSize: file.size,
        compressed: false,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Limit dimensions to 1200px max (perfect quality/size balance for QR menu)
        const MAX_DIM = 1200;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({
            blob: file,
            filename: file.name,
            originalSize: file.size,
            newSize: file.size,
            compressed: false,
          });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // JPEG 85% compression - visually lossless, but reduces file size up to 90%
        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
              const newFilename = `${baseName}.jpg`;
              resolve({
                blob,
                filename: newFilename,
                originalSize: file.size,
                newSize: blob.size,
                compressed: true,
              });
            } else {
              resolve({
                blob: file,
                filename: file.name,
                originalSize: file.size,
                newSize: file.size,
                compressed: false,
              });
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = () => {
        resolve({
          blob: file,
          filename: file.name,
          originalSize: file.size,
          newSize: file.size,
          compressed: false,
        });
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      resolve({
        blob: file,
        filename: file.name,
        originalSize: file.size,
        newSize: file.size,
        compressed: false,
      });
    };
    reader.readAsDataURL(file);
  });
};

interface AdminDashboardProps {
  initialData: MenuData;
}

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [data, setData] = useState<MenuData>(initialData);
  const [activeTab, setActiveTab] = useState<"items" | "categories">("items");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Start menu state
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  // Modals state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Temporary item/category form states
  const [itemForm, setItemForm] = useState<Partial<MenuItem>>({});
  const [categoryForm, setCategoryForm] = useState<Partial<MenuCategory>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  // Detail item input state
  const [newDetailInput, setNewDetailInput] = useState("");
  const [newTagInput, setNewTagInput] = useState("");

  // Clock state
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Çıkış hatası");
    }
  };

  // Format Turkish Date
  const getFormattedTurkishDate = () => {
    return new Date().toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Sync to database
  const saveStateToBackend = async (updatedData: MenuData, successMessage: string) => {
    const finalData = {
      ...updatedData,
      lastUpdated: getFormattedTurkishDate(),
    };
    setData(finalData);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });
        if (res.ok) {
          showMessage("success", successMessage);
        } else {
          const err = await res.json();
          showMessage("error", err.error || "Hata oluştu");
        }
      } catch (err) {
        console.error(err);
        showMessage("error", "Bağlantı hatası");
      }
    });
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCategory = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const compressionResult = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressionResult.blob, compressionResult.filename);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        showMessage("error", err.error || "Yüklenemedi");
        return;
      }

      const uploadResult = await res.json();

      if (isCategory) {
        setCategoryForm((prev) => ({
          ...prev,
          image: uploadResult.url,
          imageAlt: prev.imageAlt || `${prev.label || "Kategori"} görseli`,
        }));
      } else {
        setItemForm((prev) => ({
          ...prev,
          image: uploadResult.url,
          imageAlt: prev.imageAlt || `${prev.name || "Ürün"} görseli`,
        }));
      }

      if (compressionResult.compressed) {
        const savedPercent = Math.round(
          ((compressionResult.originalSize - compressionResult.newSize) /
            compressionResult.originalSize) *
            100
        );
        showMessage(
          "success",
          `Fotoğraf başarılı şekilde sıkıştırılmıştır. (%${savedPercent} tasarruf)`
        );
      } else {
        showMessage("success", "Dosya başarıyla yüklendi");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Yükleme hatası");
    } finally {
      setUploadingImage(false);
    }
  };

  // ITEM OPERATIONS
  const openEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({ ...item });
    setIsAddingItem(false);
  };

  const openAddItem = () => {
    setIsAddingItem(true);
    setEditingItem(null);
    setItemForm({
      id: "",
      name: "",
      category: data.categories[0]?.id || "sofra",
      description: "",
      story: "",
      price: "₺",
      priceNote: "",
      image: "/images/breakfast-spread.webp",
      imageAlt: "",
      tags: [],
      details: [],
    });
  };

  const saveItemForm = () => {
    if (!itemForm.name || !itemForm.category) {
      showMessage("error", "Eksik alanları doldurun");
      return;
    }

    let updatedItems = [...data.items];

    if (isAddingItem) {
      const slug = itemForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const finalId = `${slug}-${Date.now().toString().slice(-4)}`;

      const newItem: MenuItem = {
        id: finalId,
        category: itemForm.category!,
        name: itemForm.name!,
        description: itemForm.description || "",
        story: itemForm.story || "",
        price: itemForm.price || "₺0",
        priceNote: itemForm.priceNote || undefined,
        image: itemForm.image || "/images/breakfast-spread.webp",
        imageAlt: itemForm.imageAlt || `${itemForm.name} görseli`,
        tags: itemForm.tags || [],
        details: itemForm.details || [],
      };

      updatedItems.push(newItem);
    } else if (editingItem) {
      updatedItems = updatedItems.map((item) =>
        item.id === editingItem.id ? (itemForm as MenuItem) : item
      );
    }

    const updatedData = { ...data, items: updatedItems };
    saveStateToBackend(updatedData, "Ürün kaydedildi");

    setEditingItem(null);
    setIsAddingItem(false);
  };

  const deleteItem = (itemId: string, itemName: string) => {
    if (!confirm(`"${itemName}" silinecektir. Emin misiniz?`)) return;

    const updatedItems = data.items.filter((item) => item.id !== itemId);
    const updatedData = { ...data, items: updatedItems };
    saveStateToBackend(updatedData, "Ürün silindi");
  };

  const duplicateItem = (item: MenuItem) => {
    const duplicated: MenuItem = {
      ...item,
      id: `${item.id}-kopya-${Date.now().toString().slice(-4)}`,
      name: `${item.name} (Kopya)`,
    };
    const updatedItems = [...data.items, duplicated];
    const updatedData = { ...data, items: updatedItems };
    saveStateToBackend(updatedData, "Ürün kopyalandı");
  };

  const moveItemOrder = (index: number, direction: "up" | "down") => {
    const newItems = [...data.items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updatedData = { ...data, items: newItems };
    saveStateToBackend(updatedData, "Sıralama güncellendi");
  };

  // CATEGORY OPERATIONS
  const openEditCategory = (category: MenuCategory) => {
    setEditingCategory(category);
    setCategoryForm({ ...category });
    setIsAddingCategory(false);
  };

  const openAddCategory = () => {
    setIsAddingCategory(true);
    setEditingCategory(null);
    setCategoryForm({
      id: "",
      label: "",
      shortLabel: "",
      description: "",
      image: "/images/tea-service.webp",
      imageAlt: "",
    });
  };

  const saveCategoryForm = () => {
    if (!categoryForm.label || !categoryForm.shortLabel || (!isAddingCategory && !categoryForm.id)) {
      showMessage("error", "Eksik alanları doldurun");
      return;
    }

    let updatedCategories = [...data.categories];

    if (isAddingCategory) {
      const categoryId = categoryForm.label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .slice(0, 15);

      if (data.categories.some((c) => c.id === categoryId)) {
        showMessage("error", "Kategori mevcut");
        return;
      }

      const newCategory: MenuCategory = {
        id: categoryId,
        label: categoryForm.label!,
        shortLabel: categoryForm.shortLabel!,
        description: categoryForm.description || "",
        image: categoryForm.image || "/images/tea-service.webp",
        imageAlt: categoryForm.imageAlt || `${categoryForm.label} görseli`,
      };

      updatedCategories.push(newCategory);
    } else if (editingCategory) {
      updatedCategories = updatedCategories.map((c) =>
        c.id === editingCategory.id ? (categoryForm as MenuCategory) : c
      );
    }

    const updatedData = { ...data, categories: updatedCategories };
    saveStateToBackend(updatedData, "Kategori kaydedildi");

    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  const deleteCategory = (catId: string, catLabel: string) => {
    if (data.items.some((item) => item.category === catId)) {
      showMessage("error", `Bu kategoride ürünler var. Önce ürünleri silin.`);
      return;
    }

    if (!confirm(`"${catLabel}" kategorisi silinecektir. Emin misiniz?`)) return;

    const updatedCategories = data.categories.filter((c) => c.id !== catId);
    const updatedData = { ...data, categories: updatedCategories };
    saveStateToBackend(updatedData, "Kategori silindi");
  };

  const moveCategoryOrder = (index: number, direction: "up" | "down") => {
    const newCategories = [...data.categories];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    const updatedData = { ...data, categories: newCategories };
    saveStateToBackend(updatedData, "Kategori sırası güncellendi");
  };


  // Calculate spotlight label for card preview
  const previewVisibleTag = itemForm.tags?.find((tag) => tag === "Öne çıkan" || tag === "Yeni");
  const previewMetaLabel =
    itemForm.priceNote ||
    itemForm.tags?.find((tag) => tag !== previewVisibleTag) ||
    "Günlük hazırlanır";

  return (
    <div
      className="min-h-screen flex flex-col pb-12 select-none"
      style={{
        backgroundColor: "#008080", // Windows 95 Teal
        fontFamily: "'Courier New', Courier, monospace, sans-serif",
      }}
    >
      {/* Alert popup */}
      {message && (
        <div
          className="fixed top-4 right-4 z-50 p-3 shadow-2xl border text-xs font-bold flex items-center space-x-2"
          style={{
            backgroundColor: "#c0c0c0",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #808080",
            borderBottom: "2px solid #808080",
            boxShadow: "1px 1px 0px 0px #000000",
            color: "#000000",
          }}
        >
          <span>ℹ️</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Desktop Window */}
      <div
        className="w-full max-w-6xl mx-auto my-6 p-1 border-b-2 border-r-2 border-black flex-grow flex flex-col"
        style={{
          backgroundColor: "#c0c0c0",
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #808080",
          borderBottom: "2px solid #808080",
          boxShadow: "1px 1px 0px 0px #000000",
        }}
      >
        {/* Title Bar */}
        <div
          className="px-2 py-1 flex items-center justify-between text-white font-bold select-none text-xs"
          style={{
            background: "linear-gradient(90deg, #000080, #1084d0)",
          }}
        >
          <div className="flex items-center space-x-1">
            <span>📁</span>
            <span>Tarihi Van QR Menü Yönetim Sistemi - v1.0</span>
            {isPending && <span className="ml-2 text-yellow-300 animate-pulse">[KAYDEDİLİYOR...]</span>}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={handleLogout}
              className="w-4 h-4 text-black text-xs font-bold flex items-center justify-center cursor-pointer bg-[#c0c0c0]"
              style={{
                borderTop: "1px solid #ffffff",
                borderLeft: "1px solid #ffffff",
                borderRight: "1px solid #808080",
                borderBottom: "1px solid #808080",
              }}
              title="Çıkış"
            >
              x
            </button>
          </div>
        </div>

        {/* Win95 Menu Bar */}
        <div className="flex space-x-4 px-2 py-1 border-b border-gray-400 text-xs text-black font-semibold select-none">
          <span className="hover:bg-gray-300 px-1 cursor-pointer">Dosya</span>
          <span className="hover:bg-gray-300 px-1 cursor-pointer">Düzenle</span>
          <span className="hover:bg-gray-300 px-1 cursor-pointer">Görünüm</span>
          <a
            href="/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-gray-300 px-1 cursor-pointer flex items-center space-x-1"
          >
            <span>Canlı Menü</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <span className="hover:bg-gray-300 px-1 cursor-pointer">Yardım</span>
        </div>

        {/* Content Tabs Header */}
        <div className="flex space-x-1 px-2 pt-2 border-b border-gray-400 select-none">
          <button
            onClick={() => setActiveTab("items")}
            className="px-3 py-1 text-xs font-bold cursor-pointer transition-all"
            style={{
              backgroundColor: "#c0c0c0",
              borderTop: activeTab === "items" ? "2px solid #ffffff" : "1px solid #ffffff",
              borderLeft: activeTab === "items" ? "2px solid #ffffff" : "1px solid #ffffff",
              borderRight: activeTab === "items" ? "2px solid #808080" : "1px solid #808080",
              borderBottom: activeTab === "items" ? "2px solid #c0c0c0" : "1px solid #808080",
              marginBottom: activeTab === "items" ? "-1px" : "0",
              zIndex: activeTab === "items" ? 10 : 1,
            }}
          >
            🍽️ Ürün Yönetimi ({data.items.length})
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className="px-3 py-1 text-xs font-bold cursor-pointer transition-all"
            style={{
              backgroundColor: "#c0c0c0",
              borderTop: activeTab === "categories" ? "2px solid #ffffff" : "1px solid #ffffff",
              borderLeft: activeTab === "categories" ? "2px solid #ffffff" : "1px solid #ffffff",
              borderRight: activeTab === "categories" ? "2px solid #808080" : "1px solid #808080",
              borderBottom: activeTab === "categories" ? "2px solid #c0c0c0" : "1px solid #808080",
              marginBottom: activeTab === "categories" ? "-1px" : "0",
              zIndex: activeTab === "categories" ? 10 : 1,
            }}
          >
            📂 Kategori Yönetimi ({data.categories.length})
          </button>
        </div>

        {/* Inner Window Area */}
        <div className="p-4 flex-grow flex flex-col bg-[#c0c0c0]">
          {/* TAB 1: MENU ITEMS */}
          {activeTab === "items" && (
            <div className="flex-grow flex flex-col">
              {/* Filter controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                {/* Category filters */}
                <div
                  className="p-1 flex flex-wrap gap-1"
                  style={{
                    borderTop: "2px solid #808080",
                    borderLeft: "2px solid #808080",
                    borderRight: "2px solid #ffffff",
                    borderBottom: "2px solid #ffffff",
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  <button
                    onClick={() => setSelectedCategoryFilter("all")}
                    className="px-3 py-1 text-xs font-bold cursor-pointer"
                    style={{
                      backgroundColor: selectedCategoryFilter === "all" ? "#d4d0c8" : "#c0c0c0",
                      borderTop: selectedCategoryFilter === "all" ? "1px solid #808080" : "1px solid #ffffff",
                      borderLeft: selectedCategoryFilter === "all" ? "1px solid #808080" : "1px solid #ffffff",
                      borderRight: selectedCategoryFilter === "all" ? "1px solid #ffffff" : "1px solid #808080",
                      borderBottom: selectedCategoryFilter === "all" ? "1px solid #ffffff" : "1px solid #808080",
                      transform: selectedCategoryFilter === "all" ? "translate(1px, 1px)" : "none",
                    }}
                  >
                    Tümü
                  </button>
                  {data.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryFilter(cat.id)}
                      className="px-3 py-1 text-xs font-bold cursor-pointer"
                      style={{
                        backgroundColor: selectedCategoryFilter === cat.id ? "#d4d0c8" : "#c0c0c0",
                        borderTop: selectedCategoryFilter === cat.id ? "1px solid #808080" : "1px solid #ffffff",
                        borderLeft: selectedCategoryFilter === cat.id ? "1px solid #808080" : "1px solid #ffffff",
                        borderRight: selectedCategoryFilter === cat.id ? "1px solid #ffffff" : "1px solid #808080",
                        borderBottom: selectedCategoryFilter === cat.id ? "1px solid #ffffff" : "1px solid #808080",
                        transform: selectedCategoryFilter === cat.id ? "translate(1px, 1px)" : "none",
                      }}
                    >
                      {cat.shortLabel}
                    </button>
                  ))}
                </div>

                {/* Search & Actions */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-2 py-1.5 pl-8 text-xs bg-white text-black outline-none w-48 md:w-56"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-500" />
                  </div>

                  <button
                    onClick={openAddItem}
                    className="px-4 py-1.5 text-xs text-black font-bold flex items-center space-x-1 active:scale-[0.98] cursor-pointer"
                    style={{
                      backgroundColor: "#c0c0c0",
                      borderTop: "2px solid #ffffff",
                      borderLeft: "2px solid #ffffff",
                      borderRight: "2px solid #808080",
                      borderBottom: "2px solid #808080",
                      boxShadow: "1px 1px 0px 0px #000000",
                    }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Yeni Ürün</span>
                  </button>
                </div>
              </div>

              {/* Items List Table (Retro look) */}
              <div
                className="flex-grow overflow-auto"
                style={{
                  borderTop: "2px solid #808080",
                  borderLeft: "2px solid #808080",
                  borderRight: "2px solid #ffffff",
                  borderBottom: "2px solid #ffffff",
                  backgroundColor: "#ffffff",
                }}
              >
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr
                      className="bg-gray-200 text-black font-bold border-b border-gray-400 select-none sticky top-0"
                      style={{ backgroundColor: "#d4d0c8" }}
                    >
                      <th className="p-2 border-r border-gray-300 w-16">Görsel</th>
                      <th className="p-2 border-r border-gray-300">Ürün Adı</th>
                      <th className="p-2 border-r border-gray-300">Kategori</th>
                      <th className="p-2 border-r border-gray-300">Fiyat</th>
                      <th className="p-2 border-r border-gray-300 text-center w-12">Sıra</th>
                      <th className="p-2 text-center w-24">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-black">
                    {data.items
                      .map((item, index) => ({ item, index }))
                      .filter(({ item }) => {
                        const matchesCategory = selectedCategoryFilter === "all" || item.category === selectedCategoryFilter;
                        const matchesSearch =
                          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
                        return matchesCategory && matchesSearch;
                      })
                      .map(({ item, index }) => {
                        const categoryLabel = data.categories.find((c) => c.id === item.category)?.shortLabel || item.category;
                        return (
                          <tr key={item.id} className="hover:bg-gray-100">
                            <td className="p-2 border-r border-gray-200">
                              <div
                                className="relative h-10 w-10 border overflow-hidden"
                                style={{
                                  borderTop: "1px solid #808080",
                                  borderLeft: "1px solid #808080",
                                  borderRight: "1px solid #ffffff",
                                  borderBottom: "1px solid #ffffff",
                                }}
                              >
                                <Image
                                  src={item.image}
                                  alt={item.imageAlt || item.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                            </td>
                            <td className="p-2 border-r border-gray-200 font-bold">
                              {item.name}
                              {item.description && (
                                <div className="text-[10px] text-gray-500 font-normal truncate max-w-md">
                                  {item.description}
                                </div>
                              )}
                            </td>
                            <td className="p-2 border-r border-gray-200">{categoryLabel}</td>
                            <td className="p-2 border-r border-gray-200 font-bold text-red-800">
                              {item.price}
                              {item.priceNote && (
                                <span className="text-[9px] text-gray-400 font-normal ml-1">
                                  ({item.priceNote})
                                </span>
                              )}
                            </td>
                            <td className="p-2 border-r border-gray-200">
                              <div className="flex justify-center space-x-1">
                                <button
                                  onClick={() => moveItemOrder(index, "up")}
                                  disabled={index === 0}
                                  className="p-0.5 border bg-gray-100 disabled:opacity-30 cursor-pointer"
                                  style={{
                                    borderTop: "1px solid #ffffff",
                                    borderLeft: "1px solid #ffffff",
                                    borderRight: "1px solid #808080",
                                    borderBottom: "1px solid #808080",
                                  }}
                                >
                                  <ChevronUp className="h-3 w-3 text-black" />
                                </button>
                                <button
                                  onClick={() => moveItemOrder(index, "down")}
                                  disabled={index === data.items.length - 1}
                                  className="p-0.5 border bg-gray-100 disabled:opacity-30 cursor-pointer"
                                  style={{
                                    borderTop: "1px solid #ffffff",
                                    borderLeft: "1px solid #ffffff",
                                    borderRight: "1px solid #808080",
                                    borderBottom: "1px solid #808080",
                                  }}
                                >
                                  <ChevronDown className="h-3 w-3 text-black" />
                                </button>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex justify-center space-x-1.5">
                                <button
                                  onClick={() => openEditItem(item)}
                                  className="px-1 py-0.5 border text-[10px] font-bold cursor-pointer bg-gray-100"
                                  style={{
                                    borderTop: "1px solid #ffffff",
                                    borderLeft: "1px solid #ffffff",
                                    borderRight: "1px solid #808080",
                                    borderBottom: "1px solid #808080",
                                  }}
                                >
                                  Düzenle
                                </button>
                                <button
                                  onClick={() => duplicateItem(item)}
                                  className="px-1 py-0.5 border text-[10px] font-bold cursor-pointer bg-gray-100"
                                  style={{
                                    borderTop: "1px solid #ffffff",
                                    borderLeft: "1px solid #ffffff",
                                    borderRight: "1px solid #808080",
                                    borderBottom: "1px solid #808080",
                                  }}
                                >
                                  Kopya
                                </button>
                                <button
                                  onClick={() => deleteItem(item.id, item.name)}
                                  className="px-1 py-0.5 border text-[10px] font-bold cursor-pointer bg-red-100 text-red-800"
                                  style={{
                                    borderTop: "1px solid #ffffff",
                                    borderLeft: "1px solid #ffffff",
                                    borderRight: "1px solid #808080",
                                    borderBottom: "1px solid #808080",
                                  }}
                                >
                                  Sil
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES */}
          {activeTab === "categories" && (
            <div className="flex-grow flex flex-col">
              <div className="flex justify-end mb-4">
                <button
                  onClick={openAddCategory}
                  className="px-4 py-1.5 text-xs text-black font-bold flex items-center space-x-1 active:scale-[0.98] cursor-pointer"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #808080",
                    borderBottom: "2px solid #808080",
                    boxShadow: "1px 1px 0px 0px #000000",
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Yeni Kategori</span>
                </button>
              </div>

              {/* Categories Grid (Win95 Panels) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] p-1">
                {data.categories.map((cat, index) => {
                  const count = data.items.filter((item) => item.category === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      className="p-3 flex space-x-3 text-black"
                      style={{
                        backgroundColor: "#c0c0c0",
                        borderTop: "1px solid #ffffff",
                        borderLeft: "1px solid #ffffff",
                        borderRight: "1px solid #808080",
                        borderBottom: "1px solid #808080",
                        boxShadow: "1px 1px 0px 0px #000000",
                      }}
                    >
                      <div
                        className="relative h-16 w-16 overflow-hidden border shrink-0 bg-[#ede6e6]"
                        style={{
                          borderTop: "1px solid #808080",
                          borderLeft: "1px solid #808080",
                          borderRight: "1px solid #ffffff",
                          borderBottom: "1px solid #ffffff",
                        }}
                      >
                        <Image src={cat.image} alt={cat.imageAlt} fill className="object-cover" />
                      </div>

                      <div className="flex-grow min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-sm font-serif">{cat.label}</h3>
                              <span className="text-[10px] text-amber-900 font-bold">Navbar: {cat.shortLabel}</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => moveCategoryOrder(index, "up")}
                                disabled={index === 0}
                                className="p-0.5 border disabled:opacity-30 cursor-pointer bg-gray-100"
                                style={{
                                  borderTop: "1px solid #ffffff",
                                  borderLeft: "1px solid #ffffff",
                                  borderRight: "1px solid #808080",
                                  borderBottom: "1px solid #808080",
                                }}
                              >
                                <ChevronUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => moveCategoryOrder(index, "down")}
                                disabled={index === data.categories.length - 1}
                                className="p-0.5 border disabled:opacity-30 cursor-pointer bg-gray-100"
                                style={{
                                  borderTop: "1px solid #ffffff",
                                  borderLeft: "1px solid #ffffff",
                                  borderRight: "1px solid #808080",
                                  borderBottom: "1px solid #808080",
                                }}
                              >
                                <ChevronDown className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="text-[10px] text-gray-600 line-clamp-2 mt-1">{cat.description}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-300">
                          <span className="text-[10px] font-bold text-gray-500">
                            📦 {count} ürün var
                          </span>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditCategory(cat)}
                              className="px-1.5 py-0.5 border text-[10px] font-bold cursor-pointer bg-gray-100"
                              style={{
                                borderTop: "1px solid #ffffff",
                                borderLeft: "1px solid #ffffff",
                                borderRight: "1px solid #808080",
                                borderBottom: "1px solid #808080",
                              }}
                            >
                              Düzenle
                            </button>
                            <button
                              onClick={() => deleteCategory(cat.id, cat.label)}
                              className="px-1.5 py-0.5 border text-[10px] font-bold cursor-pointer bg-red-100 text-red-800"
                              style={{
                                borderTop: "1px solid #ffffff",
                                borderLeft: "1px solid #ffffff",
                                borderRight: "1px solid #808080",
                                borderBottom: "1px solid #808080",
                              }}
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT EDIT/ADD WIN95 WINDOW */}
      {(editingItem || isAddingItem) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="w-full max-w-4xl p-1 border-b-2 border-r-2 border-black flex flex-col md:flex-row relative"
            style={{
              backgroundColor: "#c0c0c0",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderRight: "2px solid #808080",
              borderBottom: "2px solid #808080",
              boxShadow: "1px 1px 0px 0px #000000",
            }}
          >
            {/* Left Preview Section - EXACT replication of the actual Turkish menu card */}
            <div className="w-full md:w-2/5 p-4 border-r border-gray-400 flex flex-col justify-center items-center bg-[#f8efe0]">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">MENÜ KART ÖNİZLEMESİ</span>
              
              {/* EXACT CARD REPLICATED FROM LIVE MENU */}
              <div
                className="w-full max-w-[340px] overflow-hidden"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "126px minmax(0, 1fr)",
                  minHeight: "142px",
                  border: "1px solid #251d1d",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  color: "#1d1818",
                  boxShadow: "2px 2px 0 rgba(29, 24, 24, 0.16)",
                  textAlign: "left",
                }}
              >
                {/* Media Section */}
                <div
                  style={{
                    position: "relative",
                    display: "block",
                    minWidth: "0",
                    overflow: "hidden",
                    backgroundColor: "#ede6e6",
                  }}
                >
                  {itemForm.image ? (
                    <Image
                      src={itemForm.image}
                      alt={itemForm.imageAlt || "Önizleme"}
                      fill
                      className="object-cover"
                      style={{ objectPosition: "50% 56%" }}
                    />
                  ) : null}
                  {/* Subtle bottom gradient shadow on image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, transparent 48%, rgba(29, 24, 24, 0.16))",
                    }}
                  />
                  {/* Tag badge (Öne çıkan / Yeni) */}
                  {previewVisibleTag ? (
                    <span
                      style={{
                        position: "absolute",
                        top: "0.55rem",
                        left: "0.55rem",
                        zIndex: 2,
                        display: "inline-flex",
                        minHeight: "25px",
                        alignItems: "center",
                        padding: "0.22rem 0.45rem",
                        border: "1px solid #251d1d",
                        borderRadius: "5px",
                        backgroundColor: "#74151d",
                        color: "#ffffff",
                        fontSize: "0.64rem",
                        fontWeight: 760,
                        lineHeight: 1,
                      }}
                    >
                      {previewVisibleTag}
                    </span>
                  ) : null}
                </div>

                {/* Card Body */}
                <div
                  style={{
                    display: "flex",
                    minWidth: 0,
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0.82rem 0.9rem 0.72rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) auto",
                      gap: "0.55rem",
                      alignItems: "start",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#1d1818",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 740,
                        letterSpacing: "-0.026em",
                        lineHeight: 1.08,
                      }}
                    >
                      {itemForm.name || "Ürün Adı"}
                    </span>
                    <span
                      style={{
                        color: "#74151d",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "1.15rem",
                        fontWeight: 790,
                        letterSpacing: "-0.025em",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {itemForm.price || "₺0"}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "0.48rem 0 0",
                      overflow: "hidden",
                      color: "#5d5554",
                      fontSize: "0.78rem",
                      lineHeight: 1.42,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {itemForm.description || "Ürün açıklaması burada görüntülenecektir."}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      minWidth: 0,
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.65rem",
                      marginTop: "auto",
                      paddingTop: "0.56rem",
                      color: "#6d6161",
                      fontSize: "0.7rem",
                      fontWeight: 680,
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {previewMetaLabel}
                    </span>
                    <span
                      style={{
                        display: "grid",
                        width: "30px",
                        height: "30px",
                        flex: "0 0 30px",
                        placeItems: "center",
                        border: "1px solid #251d1d",
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        color: "#74151d",
                      }}
                    >
                      <ChevronRight size={15} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="w-full md:w-3/5 p-6 flex flex-col overflow-y-auto max-h-[80vh] md:max-h-[600px] text-black">
              {/* Window Header */}
              <div
                className="px-2 py-1 flex items-center justify-between text-white font-bold select-none text-xs mb-4"
                style={{
                  background: "linear-gradient(90deg, #000080, #1084d0)",
                }}
              >
                <span>📁 Ürün Kartı Düzenleyici</span>
                <button
                  onClick={() => { setEditingItem(null); setIsAddingItem(false); }}
                  className="w-4 h-4 text-black text-xs font-bold flex items-center justify-center cursor-pointer bg-[#c0c0c0]"
                  style={{
                    borderTop: "1px solid #ffffff",
                    borderLeft: "1px solid #ffffff",
                    borderRight: "1px solid #808080",
                    borderBottom: "1px solid #808080",
                  }}
                >
                  x
                </button>
              </div>

              {/* Form Body */}
              <div className="space-y-3 flex-grow text-xs font-bold">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-black mb-1">Ürün Adı:</label>
                    <input
                      type="text"
                      value={itemForm.name || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-2 py-1 bg-white text-black outline-none"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-black mb-1">Kategori:</label>
                    <select
                      value={itemForm.category || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-2 py-1 bg-white text-black outline-none"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    >
                      {data.categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-black mb-1">Fiyat:</label>
                    <input
                      type="text"
                      value={itemForm.price || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, price: e.target.value }))}
                      className="w-full px-2 py-1 bg-white text-black outline-none font-bold"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-black mb-1">Fiyat Notu (İsteğe Bağlı):</label>
                    <input
                      type="text"
                      value={itemForm.priceNote || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, priceNote: e.target.value }))}
                      className="w-full px-2 py-1 bg-white text-black outline-none"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black mb-1">Açıklama:</label>
                  <textarea
                    value={itemForm.description || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-2 py-1 bg-white text-black outline-none h-14 resize-none"
                    style={{
                      borderTop: "2px solid #808080",
                      borderLeft: "2px solid #808080",
                      borderRight: "2px solid #ffffff",
                      borderBottom: "2px solid #ffffff",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-black mb-1">Detaylı Hikaye:</label>
                  <textarea
                    value={itemForm.story || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, story: e.target.value }))}
                    className="w-full px-2 py-1 bg-white text-black outline-none h-14 resize-none"
                    style={{
                      borderTop: "2px solid #808080",
                      borderLeft: "2px solid #808080",
                      borderRight: "2px solid #ffffff",
                      borderBottom: "2px solid #ffffff",
                    }}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-black mb-1">Ürün Görseli (Dosya veya Link):</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={itemForm.image || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, image: e.target.value }))}
                      className="flex-grow px-2 py-1 bg-white text-black outline-none"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                    <label
                      className="px-3 py-1 text-black font-bold flex items-center space-x-1 cursor-pointer"
                      style={{
                        backgroundColor: "#c0c0c0",
                        borderTop: "1px solid #ffffff",
                        borderLeft: "1px solid #ffffff",
                        borderRight: "1px solid #808080",
                        borderBottom: "1px solid #808080",
                      }}
                    >
                      {uploadingImage ? (
                        <span className="inline-block animate-spin rounded-full h-3 w-3 border-2 border-black border-t-transparent" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      <span>Yükle</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-black mb-1">Etiket Seçin:</label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {["Öne çıkan", "Tavsiye", "Vejetaryen", "Yeni"].map((tag) => {
                      const exists = itemForm.tags?.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const current = itemForm.tags || [];
                            const next = exists
                              ? current.filter((t) => t !== tag)
                              : [...current, tag];
                            setItemForm((prev) => ({ ...prev, tags: next }));
                          }}
                          className="px-2 py-1 border text-[10px] font-bold cursor-pointer"
                          style={{
                            backgroundColor: exists ? "#d4d0c8" : "#c0c0c0",
                            borderTop: exists ? "1px solid #808080" : "1px solid #ffffff",
                            borderLeft: exists ? "1px solid #808080" : "1px solid #ffffff",
                            borderRight: exists ? "1px solid #ffffff" : "1px solid #808080",
                            borderBottom: exists ? "1px solid #ffffff" : "1px solid #808080",
                            transform: exists ? "translate(0.5px, 0.5px)" : "none",
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Özel etiket..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="flex-grow px-2 py-1 bg-white text-black outline-none"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newTagInput) return;
                        const current = itemForm.tags || [];
                        if (!current.includes(newTagInput)) {
                          setItemForm((prev) => ({ ...prev, tags: [...current, newTagInput] }));
                        }
                        setNewTagInput("");
                      }}
                      className="px-3 py-1 bg-gray-300 border text-black font-bold cursor-pointer"
                      style={{
                        borderTop: "1px solid #ffffff",
                        borderLeft: "1px solid #ffffff",
                        borderRight: "1px solid #808080",
                        borderBottom: "1px solid #808080",
                      }}
                    >
                      Ekle
                    </button>
                  </div>
                </div>

                {/* Details List */}
                <div>
                  <label className="block text-black mb-1">Ürün Detayları / Özellikleri:</label>
                  <ul className="space-y-1 mb-2">
                    {itemForm.details?.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between px-2 py-1 text-[11px] bg-gray-100 border border-gray-300"
                      >
                        <span>{detail}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = itemForm.details?.filter((_, i) => i !== idx);
                            setItemForm((prev) => ({ ...prev, details: next }));
                          }}
                          className="text-red-700 hover:text-red-950 font-bold ml-2 cursor-pointer"
                        >
                          [Sil]
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Yeni özellik yaz..."
                      value={newDetailInput}
                      onChange={(e) => setNewDetailInput(e.target.value)}
                      className="flex-grow px-2 py-1 bg-white text-black outline-none"
                      style={{
                        borderTop: "2px solid #808080",
                        borderLeft: "2px solid #808080",
                        borderRight: "2px solid #ffffff",
                        borderBottom: "2px solid #ffffff",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newDetailInput) return;
                        const current = itemForm.details || [];
                        setItemForm((prev) => ({ ...prev, details: [...current, newDetailInput] }));
                        setNewDetailInput("");
                      }}
                      className="px-3 py-1 bg-gray-300 border text-black font-bold cursor-pointer"
                      style={{
                        borderTop: "1px solid #ffffff",
                        borderLeft: "1px solid #ffffff",
                        borderRight: "1px solid #808080",
                        borderBottom: "1px solid #808080",
                      }}
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4 border-t pt-4 border-gray-400">
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsAddingItem(false); }}
                  className="px-4 py-1.5 text-xs text-black font-bold cursor-pointer"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #808080",
                    borderBottom: "2px solid #808080",
                    boxShadow: "1px 1px 0px 0px #000000",
                  }}
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={saveItemForm}
                  className="px-4 py-1.5 text-xs text-black font-bold flex items-center space-x-1 cursor-pointer"
                  style={{
                    backgroundColor: "#c0c0c0",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #808080",
                    borderBottom: "2px solid #808080",
                    boxShadow: "1px 1px 0px 0px #000000",
                  }}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY EDIT/ADD WINDOW */}
      {(editingCategory || isAddingCategory) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-md p-1 border-b-2 border-r-2 border-black flex flex-col relative"
            style={{
              backgroundColor: "#c0c0c0",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderRight: "2px solid #808080",
              borderBottom: "2px solid #808080",
              boxShadow: "1px 1px 0px 0px #000000",
            }}
          >
            {/* Title Bar */}
            <div
              className="px-2 py-1 flex items-center justify-between text-white font-bold select-none text-xs mb-4"
              style={{
                background: "linear-gradient(90deg, #000080, #1084d0)",
              }}
            >
              <span>📁 Kategori Kartı Düzenleyici</span>
              <button
                onClick={() => { setEditingCategory(null); setIsAddingCategory(false); }}
                className="w-4 h-4 text-black text-xs font-bold flex items-center justify-center cursor-pointer bg-[#c0c0c0]"
                style={{
                  borderTop: "1px solid #ffffff",
                  borderLeft: "1px solid #ffffff",
                  borderRight: "1px solid #808080",
                  borderBottom: "1px solid #808080",
                }}
              >
                x
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 text-xs font-bold text-black space-y-4">
              <div>
                <label className="block mb-1">Kategori Adı:</label>
                <input
                  type="text"
                  value={categoryForm.label || ""}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      label: e.target.value,
                      shortLabel: prev.shortLabel || e.target.value.substring(0, 10),
                    }))
                  }
                  className="w-full px-2 py-1 bg-white text-black outline-none"
                  style={{
                    borderTop: "2px solid #808080",
                    borderLeft: "2px solid #808080",
                    borderRight: "2px solid #ffffff",
                    borderBottom: "2px solid #ffffff",
                  }}
                />
              </div>

              <div>
                <label className="block mb-1">Kısa Etiket (Menü Üstü Menü Navigasyonu İçin):</label>
                <input
                  type="text"
                  value={categoryForm.shortLabel || ""}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, shortLabel: e.target.value }))}
                  className="w-full px-2 py-1 bg-white text-black outline-none"
                  style={{
                    borderTop: "2px solid #808080",
                    borderLeft: "2px solid #808080",
                    borderRight: "2px solid #ffffff",
                    borderBottom: "2px solid #ffffff",
                  }}
                />
              </div>

              <div>
                <label className="block mb-1">Açıklama:</label>
                <textarea
                  value={categoryForm.description || ""}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-2 py-1 bg-white text-black outline-none h-16 resize-none"
                  style={{
                    borderTop: "2px solid #808080",
                    borderLeft: "2px solid #808080",
                    borderRight: "2px solid #ffffff",
                    borderBottom: "2px solid #ffffff",
                  }}
                />
              </div>

              <div>
                <label className="block mb-1">Kategori Görseli (Dosya veya Link):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={categoryForm.image || ""}
                    onChange={(e) => setCategoryForm((prev) => ({ ...prev, image: e.target.value }))}
                    className="flex-grow px-2 py-1 bg-white text-black outline-none"
                    style={{
                      borderTop: "2px solid #808080",
                      borderLeft: "2px solid #808080",
                      borderRight: "2px solid #ffffff",
                      borderBottom: "2px solid #ffffff",
                    }}
                  />
                  <label
                    className="px-3 py-1 text-black font-bold flex items-center space-x-1 cursor-pointer"
                    style={{
                      backgroundColor: "#c0c0c0",
                      borderTop: "1px solid #ffffff",
                      borderLeft: "1px solid #ffffff",
                      borderRight: "1px solid #808080",
                      borderBottom: "1px solid #808080",
                    }}
                  >
                    {uploadingImage ? (
                      <span className="inline-block animate-spin rounded-full h-3 w-3 border-2 border-black border-t-transparent" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>Yükle</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={categoryForm.imageAlt || ""}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, imageAlt: e.target.value }))}
                  placeholder="Alt açıklama..."
                  className="w-full px-2 py-1 bg-white text-black outline-none mt-1"
                  style={{
                    borderTop: "1px solid #808080",
                    borderLeft: "1px solid #808080",
                    borderRight: "2px solid #ffffff",
                    borderBottom: "2px solid #ffffff",
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 border-t pt-4 p-6 border-gray-400">
              <button
                type="button"
                onClick={() => { setEditingCategory(null); setIsAddingCategory(false); }}
                className="px-4 py-1.5 text-xs text-black font-bold cursor-pointer"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #808080",
                  borderBottom: "2px solid #808080",
                  boxShadow: "1px 1px 0px 0px #000000",
                }}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={saveCategoryForm}
                className="px-4 py-1.5 text-xs text-black font-bold flex items-center space-x-1 cursor-pointer"
                style={{
                  backgroundColor: "#c0c0c0",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #808080",
                  borderBottom: "2px solid #808080",
                  boxShadow: "1px 1px 0px 0px #000000",
                }}
              >
                <Check className="h-3.5 w-3.5" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WINDOWS 95 BOTTOM TASKBAR (Massive wow factor!) */}
      <footer
        className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] flex items-center justify-between px-2 z-50 select-none border-t-2 border-t-white"
        style={{
          borderBottom: "1px solid #000",
          boxShadow: "inset 0 1px 0 #fff",
        }}
      >
        <div className="flex items-center space-x-2">
          {/* Start Button */}
          <button
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className="px-2 py-1 text-xs font-bold text-black flex items-center space-x-1.5 cursor-pointer relative"
            style={{
              backgroundColor: "#c0c0c0",
              borderTop: isStartMenuOpen ? "2px solid #808080" : "2px solid #ffffff",
              borderLeft: isStartMenuOpen ? "2px solid #808080" : "2px solid #ffffff",
              borderRight: isStartMenuOpen ? "2px solid #ffffff" : "2px solid #808080",
              borderBottom: isStartMenuOpen ? "2px solid #ffffff" : "2px solid #808080",
              boxShadow: isStartMenuOpen ? "none" : "1px 1px 0px 0px #000000",
              transform: isStartMenuOpen ? "translate(0.5px, 0.5px)" : "none",
            }}
          >
            <span className="text-sm">🏁</span>
            <span className="font-extrabold" style={{ fontSize: "11px" }}>Başlat</span>
          </button>

          {/* Start Menu Popup */}
          {isStartMenuOpen && (
            <div
              className="absolute bottom-10 left-2 w-48 border-b-2 border-r-2 border-black p-0.5 z-50 text-black flex"
              style={{
                backgroundColor: "#c0c0c0",
                borderTop: "2px solid #ffffff",
                borderLeft: "2px solid #ffffff",
                borderRight: "2px solid #808080",
                borderBottom: "2px solid #808080",
                boxShadow: "1px 1px 0px 0px #000000",
              }}
            >
              {/* Vertical side panel */}
              <div
                className="w-8 flex flex-col justify-end p-1 text-white font-extrabold text-[10px] select-none uppercase tracking-wider"
                style={{
                  background: "linear-gradient(180deg, #000080, #1084d0)",
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                }}
              >
                Windows 95
              </div>

              {/* Start menu options */}
              <div className="flex-grow flex flex-col text-[11px] font-bold py-1 bg-white border border-[#808080] border-r-white border-b-white">
                <div
                  onClick={() => {
                    alert("Tarihi Van Kahvaltı Evi QR Menü Yönetim Paneli\nSürüm: 1.0\nTasarım: Windows 95 Retro Edition");
                    setIsStartMenuOpen(false);
                  }}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center space-x-2"
                >
                  <span>💻</span>
                  <span>Sistem Hakkında</span>
                </div>
                <div
                  onClick={() => {
                    alert("Veritabanı: Supabase SQL Connection\nDepolama: Hybrid Cloud (Rest API)");
                    setIsStartMenuOpen(false);
                  }}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center space-x-2"
                >
                  <Database className="h-3 w-3" />
                  <span>Veritabanı Durumu</span>
                </div>
                <hr className="my-1 border-gray-300" />
                <div
                  onClick={handleLogout}
                  className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center space-x-2 text-red-800 hover:text-white"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Oturumu Kapat</span>
                </div>
              </div>
            </div>
          )}

          {/* Active Tasks bar */}
          <div
            className="px-3 py-1 text-[11px] font-bold text-black border shrink-0 bg-gray-200"
            style={{
              borderTop: "1px solid #808080",
              borderLeft: "1px solid #808080",
              borderRight: "1px solid #ffffff",
              borderBottom: "1px solid #ffffff",
            }}
          >
            📁 Tarihi Van Menü
          </div>
        </div>

        {/* System tray (clock and indicators) */}
        <div
          className="h-7 border-t-2 border-l-2 border-r-white border-b-white border flex items-center justify-between px-2 space-x-2 bg-gray-200 select-none"
          style={{
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #ffffff",
            borderBottom: "2px solid #ffffff",
          }}
        >
          <div className="flex items-center space-x-1">
            <Volume2 className="h-3.5 w-3.5 text-black shrink-0" />
            <Computer className="h-3.5 w-3.5 text-black shrink-0" />
            <Database className="h-3.5 w-3.5 text-green-700 shrink-0" />
          </div>
          <span className="text-[10px] font-bold text-black tracking-tight">{time}</span>
        </div>
      </footer>
    </div>
  );
}

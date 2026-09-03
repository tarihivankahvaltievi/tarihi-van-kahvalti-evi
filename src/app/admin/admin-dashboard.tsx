"use client";

import { useState, useTransition, useMemo } from "react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash,
  LogOut,
  Upload,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  Copy,
  ChevronRight,
  ExternalLink,
  Search,
  UtensilsCrossed,
  Layers,
  Clock,
  Calendar,
  CalendarDays,
  CalendarCheck,
  Phone,
  MessageCircle,
  Users,
  Bell,
  Download,
  Smartphone,
  Info,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { MenuData, MenuItem, MenuCategory } from "../menu/menu-storage";
import type {
  Reservation,
  ReservationData,
  ReservationStatus,
  ServiceType,
} from "../reservations/reservation-storage";


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
  initialReservations?: ReservationData;
  calendarFeedUrl?: string;
  webcalFeedUrl?: string;
}

export function AdminDashboard({
  initialData,
  initialReservations,
  calendarFeedUrl = "",
  webcalFeedUrl = "",
}: AdminDashboardProps) {
  const [data, setData] = useState<MenuData>(initialData);
  const [reservations, setReservations] = useState<Reservation[]>(
    initialReservations?.reservations || []
  );
  const [activeTab, setActiveTab] = useState<"items" | "categories" | "reservations">("items");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Reservation filter & search states
  const [reservationFilter, setReservationFilter] = useState<
    "all" | "upcoming" | "today" | "pending" | "confirmed" | "cancelled"
  >("all");
  const [reservationSearch, setReservationSearch] = useState("");
  const [isAddingReservation, setIsAddingReservation] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [copiedFeed, setCopiedFeed] = useState(false);
  const [isRefreshingReservations, setIsRefreshingReservations] = useState(false);

  // Reservation form state
  const [reservationForm, setReservationForm] = useState<Partial<Reservation>>({
    customerName: "",
    customerPhone: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    guests: 2,
    serviceType: "breakfast",
    note: "",
    status: "confirmed",
  });

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

  const uniqueImages = Array.from(
    new Set([
      ...data.items.map((item) => item.image),
      ...data.categories.map((cat) => cat.image)
    ])
  ).filter((img) => img && (img.startsWith("/") || img.startsWith("http")));

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Copy calendar subscription feed link
  const copyCalendarLink = async () => {
    try {
      await navigator.clipboard.writeText(calendarFeedUrl);
      setCopiedFeed(true);
      showMessage("success", "iPhone Takvim linki panoya kopyalandı!");
      setTimeout(() => setCopiedFeed(false), 3000);
    } catch {
      showMessage("error", "Link kopyalanamadı");
    }
  };

  // Refresh reservations from server
  const refreshReservations = async () => {
    setIsRefreshingReservations(true);
    try {
      const res = await fetch("/api/reservations");
      if (res.ok) {
        const json = await res.json();
        setReservations(json.reservations || []);
        showMessage("success", "Rezervasyon listesi güncellendi");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Rezervasyonlar yüklenemedi");
    } finally {
      setIsRefreshingReservations(false);
    }
  };

  // Update reservation status
  const handleUpdateReservationStatus = async (id: string, newStatus: ReservationStatus) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        const statusLabel =
          newStatus === "confirmed"
            ? "Onaylandı"
            : newStatus === "cancelled"
            ? "İptal Edildi"
            : "Beklemeye Alındı";
        showMessage("success", `Rezervasyon ${statusLabel}`);
      } else {
        showMessage("error", "Durum güncellenemedi");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Sunucu hatası");
    }
  };

  // Delete reservation
  const handleDeleteReservation = async (id: string, name: string) => {
    if (!confirm(`"${name}" adına açılan rezervasyonu silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
        showMessage("success", "Rezervasyon silindi");
      } else {
        showMessage("error", "Rezervasyon silinemedi");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Sunucu hatası");
    }
  };

  // Save manual reservation form
  const handleSaveReservationForm = async () => {
    if (!reservationForm.customerName || !reservationForm.customerPhone || !reservationForm.date || !reservationForm.time) {
      showMessage("error", "Lütfen ad soyad, telefon, tarih ve saat alanlarını doldurun");
      return;
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationForm),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.reservation) {
          setReservations((prev) => [json.reservation, ...prev]);
          showMessage("success", "Yeni rezervasyon eklendi ve iPhone takviminize işlendi!");
          setIsAddingReservation(false);
          setReservationForm({
            customerName: "",
            customerPhone: "",
            date: new Date().toISOString().split("T")[0],
            time: "10:00",
            guests: 2,
            serviceType: "breakfast",
            note: "",
            status: "confirmed",
          });
        }
      } else {
        const err = await res.json();
        showMessage("error", err.error || "Rezervasyon kaydedilemedi");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Sunucu hatası");
    }
  };

  // Counts & Stats
  const todayStr = new Date().toISOString().split("T")[0];
  const pendingCount = useMemo(
    () => reservations.filter((r) => r.status === "pending").length,
    [reservations]
  );
  const todayCount = useMemo(
    () => reservations.filter((r) => r.date === todayStr && r.status !== "cancelled").length,
    [reservations, todayStr]
  );
  const upcomingCount = useMemo(
    () => reservations.filter((r) => r.date >= todayStr && r.status !== "cancelled").length,
    [reservations, todayStr]
  );

  // Relative time helper
  const getReservationRelativeTime = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const target = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Bugün";
    if (diffDays === 1) return "Yarın";
    if (diffDays === -1) return "Dün";
    if (diffDays < -1) return `${Math.abs(diffDays)} gün önce`;
    if (diffDays < 30) return `${diffDays} gün sonra`;
    const diffMonths = Math.round(diffDays / 30);
    return `${diffMonths} ay sonra`;
  };

  // Format Turkish Date Long
  const formatTurkishDateLong = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "short",
    });
  };

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      if (reservationFilter === "pending" && r.status !== "pending") return false;
      if (reservationFilter === "confirmed" && r.status !== "confirmed") return false;
      if (reservationFilter === "cancelled" && r.status !== "cancelled") return false;
      if (reservationFilter === "today" && r.date !== todayStr) return false;
      if (reservationFilter === "upcoming" && (r.date < todayStr || r.status === "cancelled")) return false;

      if (reservationSearch.trim()) {
        const search = reservationSearch.toLowerCase();
        const matchesName = (r.customerName || "").toLowerCase().includes(search);
        const matchesPhone = (r.customerPhone || "").includes(search);
        const matchesNote = (r.note || "").toLowerCase().includes(search);
        const matchesId = (r.id || "").toLowerCase().includes(search);
        return matchesName || matchesPhone || matchesNote || matchesId;
      }

      return true;
    });
  }, [reservations, reservationFilter, reservationSearch, todayStr]);


  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Çıkış yapılırken bir hata oluştu");
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
    // Auto-update lastUpdated timestamp on any save
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
          showMessage("error", err.error || "Değişiklikler kaydedilemedi");
        }
      } catch (err) {
        console.error(err);
        showMessage("error", "İletişim hatası. İnternet bağlantınızı kontrol edin.");
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
        showMessage("error", err.error || "Görsel yüklenemedi");
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
        showMessage("success", "Görsel başarıyla yüklendi");
      }
    } catch (err) {
      console.error(err);
      showMessage("error", "Görsel yüklenirken sunucu hatası oluştu");
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
      showMessage("error", "Lütfen ürün adı ve kategori alanlarını doldurun");
      return;
    }

    // Format and sanitize price (e.g. "450" -> "₺450", "450 TL" -> "₺450")
    let sanitizedPrice = itemForm.price?.trim() || "₺0";
    if (/^\d+(\.\d+)?$/.test(sanitizedPrice)) {
      sanitizedPrice = `₺${sanitizedPrice}`;
    } else if (/^\d+(\.\d+)?\s*₺$/.test(sanitizedPrice) || /^\d+(\.\d+)?\s*tl$/i.test(sanitizedPrice)) {
      const num = sanitizedPrice.match(/\d+(\.\d+)?/)?.[0] || "0";
      sanitizedPrice = `₺${num}`;
    }

    const finalItemForm = {
      ...itemForm,
      price: sanitizedPrice,
    };

    let updatedItems = [...data.items];

    if (isAddingItem) {
      // Create a unique slug from name (Turkish aware)
      const cleanName = itemForm.name
        .replace(/Ğ/g, "g").replace(/ğ/g, "g")
        .replace(/Ü/g, "u").replace(/ü/g, "u")
        .replace(/Ş/g, "s").replace(/ş/g, "s")
        .replace(/İ/g, "i").replace(/ı/g, "i")
        .replace(/Ö/g, "o").replace(/ö/g, "o")
        .replace(/Ç/g, "c").replace(/ç/g, "c");
      const slug = cleanName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      const finalId = `${slug}-${Date.now().toString().slice(-4)}`;

      const newItem: MenuItem = {
        id: finalId,
        category: finalItemForm.category!,
        name: finalItemForm.name!,
        description: finalItemForm.description || "",
        story: finalItemForm.story || "",
        price: finalItemForm.price,
        priceNote: finalItemForm.priceNote || undefined,
        image: finalItemForm.image || "/images/breakfast-spread.webp",
        imageAlt: finalItemForm.imageAlt || `${finalItemForm.name} görseli`,
        tags: finalItemForm.tags || [],
        details: finalItemForm.details || [],
      };

      updatedItems.push(newItem);
    } else if (editingItem) {
      updatedItems = updatedItems.map((item) =>
        item.id === editingItem.id ? (finalItemForm as MenuItem) : item
      );
    }

    const updatedData = { ...data, items: updatedItems };
    saveStateToBackend(updatedData, isAddingItem ? "Yeni ürün başarıyla eklendi" : "Ürün başarıyla güncellendi");

    setEditingItem(null);
    setIsAddingItem(false);
  };

  const deleteItem = (itemId: string, itemName: string) => {
    if (!confirm(`"${itemName}" adlı ürünü silmek istediğinize emin misiniz?`)) return;

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

    // Swap items
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const updatedData = { ...data, items: newItems };
    saveStateToBackend(updatedData, "Ürün sıralaması güncellendi");
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
      showMessage("error", "Lütfen kategori başlığı ve kısa etiket alanlarını doldurun");
      return;
    }

    let updatedCategories = [...data.categories];

    if (isAddingCategory) {
      const cleanLabel = categoryForm.label!
        .replace(/Ğ/g, "g").replace(/ğ/g, "g")
        .replace(/Ü/g, "u").replace(/ü/g, "u")
        .replace(/Ş/g, "s").replace(/ş/g, "s")
        .replace(/İ/g, "i").replace(/ı/g, "i")
        .replace(/Ö/g, "o").replace(/ö/g, "o")
        .replace(/Ç/g, "c").replace(/ç/g, "c");
      const categoryId = cleanLabel
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .slice(0, 15);

      // Check for duplicate ID
      if (data.categories.some((c) => c.id === categoryId)) {
        showMessage("error", "Bu isimde bir kategori zaten mevcut");
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
    saveStateToBackend(updatedData, isAddingCategory ? "Yeni kategori eklendi" : "Kategori güncellendi");

    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  const deleteCategory = (catId: string, catLabel: string) => {
    if (data.items.some((item) => item.category === catId)) {
      showMessage("error", `Bu kategoriye ait ürünler var ("${catLabel}"). Önce bu ürünlerin kategorisini değiştirin ya da ürünleri silin.`);
      return;
    }

    if (!confirm(`"${catLabel}" kategorisini silmek istediğinize emin misiniz?`)) return;

    const updatedCategories = data.categories.filter((c) => c.id !== catId);
    const updatedData = { ...data, categories: updatedCategories };
    saveStateToBackend(updatedData, "Kategori silindi");
  };

  const moveCategoryOrder = (index: number, direction: "up" | "down") => {
    const newCategories = [...data.categories];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    // Swap categories
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    const updatedData = { ...data, categories: newCategories };
    saveStateToBackend(updatedData, "Kategori sıralaması güncellendi");
  };

  // Filtered menu items for display (retains original index for sorting operations)
  const filteredWithIndex = data.items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const matchesCategory = selectedCategoryFilter === "all" || item.category === selectedCategoryFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.story && item.story.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

  return (
    <div
      className="min-h-screen flex flex-col pb-12"
      style={{
        background: "var(--soft)",
        fontFamily: "var(--font-geist-sans), sans-serif",
      }}
    >
      {/* Top Notification Toast */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl border text-sm font-medium flex items-center space-x-2 animate-bounce`}
          style={{
            backgroundColor: message.type === "success" ? "#f0fdf4" : "#fef2f2",
            borderColor: message.type === "success" ? "#bbf7d0" : "#fecaca",
            color: message.type === "success" ? "#166534" : "#991b1b",
          }}
        >
          {message.type === "success" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin Header */}
      <header
        className="border-b px-4 py-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between sticky top-0 z-40 bg-white/90 backdrop-blur-md"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="relative" style={{ height: "40px", width: "32px" }}>
            <Image
              src="/images/brand-icon-small.png"
              alt="Logo"
              fill
              sizes="32px"
              priority
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif flex items-center space-x-2">
              <span style={{ color: "var(--red)" }}>Tarihi Van</span>
              <span className="text-sm font-sans font-medium px-2 py-0.5 rounded-full bg-[#f4ecdf] border border-[#e5d8bf] text-amber-800">
                Yönetim
              </span>
            </h1>
            <div className="text-xs flex items-center space-x-1" style={{ color: "var(--muted)" }}>
              <Clock className="h-3 w-3" />
              <span>Güncelleme: {data.lastUpdated}</span>
              {isPending && <span className="ml-2 text-red-700 animate-pulse">(Kaydediliyor...)</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center space-x-1 hover:bg-[#fff9ed] cursor-pointer"
            style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
          >
            <span>Canlı Menüyü Gör</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-white transition-all flex items-center space-x-1 cursor-pointer"
            style={{ backgroundColor: "var(--red)" }}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Çıkış</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 mt-6 flex-grow">
        {/* Navigation Tabs */}
        <div className="flex border-b mb-6 overflow-x-auto scrollbar-thin" style={{ borderColor: "var(--line)" }}>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`py-3 px-5 font-semibold text-sm border-b-2 transition-all flex items-center space-x-2 cursor-pointer shrink-0 ${
              activeTab === "reservations"
                ? "border-red-800 text-red-800 bg-red-50/50"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Rezervasyonlar & iPhone Takvimi ({reservations.length})</span>
            {pendingCount > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white font-bold animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("items")}
            className={`py-3 px-5 font-semibold text-sm border-b-2 transition-all flex items-center space-x-2 cursor-pointer shrink-0 ${
              activeTab === "items"
                ? "border-red-800 text-red-800 bg-red-50/50"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span>Ürün Yönetimi ({data.items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`py-3 px-5 font-semibold text-sm border-b-2 transition-all flex items-center space-x-2 cursor-pointer shrink-0 ${
              activeTab === "categories"
                ? "border-red-800 text-red-800 bg-red-50/50"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Kategori Yönetimi ({data.categories.length})</span>
          </button>
        </div>

        {/* TAB: RESERVATIONS & IPHONE CALENDAR */}
        {activeTab === "reservations" && (
          <div className="space-y-6">
            {/* Top Card: iPhone Live Calendar Sync Hero */}
            <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-[#1c1817] via-[#2a1c1b] to-[#1a1211] text-[#fff8eb] shadow-xl border border-[#3e2c2a] relative overflow-hidden">
              <div className="absolute right-0 top-0 -mt-6 -mr-6 w-48 h-48 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
                <div className="max-w-2xl space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/50 text-red-300 text-xs font-semibold">
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Apple & iPhone Takvim Entegrasyonu</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif tracking-tight text-white">
                    iPhone Takviminizle Canlı Otomatik Senkronizasyon
                  </h2>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    Müşteriler masa ayırttığında (2 ay, 6 ay sonrasına olsa bile) rezervasyonlar doğrudan iPhone Takviminize işlenir. 
                    Etkinlikten <strong>1 gün önce</strong> ve <strong>2 saat önce</strong> otomatik bildirim alırsınız.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  {webcalFeedUrl ? (
                    <a
                      href={webcalFeedUrl}
                      className="px-5 py-3 rounded-xl bg-white text-stone-900 font-bold text-sm hover:bg-stone-100 transition-all flex items-center space-x-2 shadow-lg cursor-pointer shrink-0"
                    >
                      <Smartphone className="h-4 w-4 text-red-800" />
                      <span>iPhone Takvimime Bağla</span>
                    </a>
                  ) : null}

                  <button
                    onClick={copyCalendarLink}
                    className="px-4 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 text-stone-200 font-semibold text-sm transition-all flex items-center space-x-2 cursor-pointer shrink-0"
                  >
                    {copiedFeed ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedFeed ? "Kopyalandı!" : "Takvim Linkini Kopyala"}</span>
                  </button>

                  <button
                    onClick={() => setShowIosGuide(!showIosGuide)}
                    className="px-4 py-3 rounded-xl bg-stone-800/50 hover:bg-stone-700/50 border border-stone-700/60 text-stone-300 font-semibold text-sm transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
                  >
                    <Info className="h-4 w-4 text-amber-400" />
                    <span>{showIosGuide ? "Rehberi Kapat" : "Kurulum Rehberi"}</span>
                  </button>
                </div>
              </div>

              {/* Collapsible iOS Setup Guide */}
              {showIosGuide && (
                <div className="mt-6 pt-6 border-t border-stone-700/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-300">
                  <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">1</span>
                      <span>Linke Dokunun</span>
                    </div>
                    <p className="text-stone-300">
                      iPhone&apos;unuzda Safari ile panele girip <strong>&quot;iPhone Takvimime Bağla&quot;</strong> butonuna dokunun.
                    </p>
                  </div>

                  <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">2</span>
                      <span>Abone Ol&apos;u Seçin</span>
                    </div>
                    <p className="text-stone-300">
                      Apple Takvim açıldığında ekrandaki <strong>&quot;Abone Ol&quot; (Subscribe)</strong> seçeneğine tıklayın.
                    </p>
                  </div>

                  <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800 space-y-1">
                    <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">3</span>
                      <span>Hazır!</span>
                    </div>
                    <p className="text-stone-300">
                      Artık tüm rezervasyonlar arka planda iPhone&apos;unuza düşer ve alarmlar otomatik çalar.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  <span>Toplam Rezervasyon</span>
                </div>
                <div className="text-2xl font-bold font-serif text-gray-900 mt-1">{reservations.length}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                  <span>Yaklaşanlar</span>
                </div>
                <div className="text-2xl font-bold font-serif text-blue-900 mt-1">{upcomingCount}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider flex items-center space-x-1">
                  <Bell className="h-3.5 w-3.5 text-amber-500" />
                  <span>Bekleyen Talepler</span>
                </div>
                <div className="text-2xl font-bold font-serif text-amber-900 mt-1">{pendingCount}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider flex items-center space-x-1">
                  <UtensilsCrossed className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Bugünün Masaları</span>
                </div>
                <div className="text-2xl font-bold font-serif text-emerald-900 mt-1">{todayCount}</div>
              </div>
            </div>

            {/* Filters, Search & Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "Tümü", count: reservations.length },
                  { id: "upcoming", label: "Yaklaşanlar", count: upcomingCount },
                  { id: "today", label: "Bugün", count: todayCount },
                  { id: "pending", label: "Bekleyenler", count: pendingCount },
                  { id: "confirmed", label: "Onaylananlar", count: reservations.filter((r) => r.status === "confirmed").length },
                  { id: "cancelled", label: "İptaller", count: reservations.filter((r) => r.status === "cancelled").length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setReservationFilter(
                        tab.id as "all" | "upcoming" | "today" | "pending" | "confirmed" | "cancelled",
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center space-x-1 ${
                      reservationFilter === tab.id
                        ? "bg-red-800 text-white border-red-800 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${reservationFilter === tab.id ? "bg-red-900 text-white" : "bg-gray-100 text-gray-600"}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative min-w-[200px] flex-grow md:flex-grow-0">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={reservationSearch}
                    onChange={(e) => setReservationSearch(e.target.value)}
                    placeholder="İsim, tel veya not ara..."
                    className="w-full pl-9 pr-3 py-2 border rounded-lg text-xs bg-white focus:outline-none focus:border-red-800"
                  />
                </div>

                <button
                  onClick={refreshReservations}
                  disabled={isRefreshingReservations}
                  title="Listeyi Yenile"
                  className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshingReservations ? "animate-spin text-red-800" : ""}`} />
                </button>

                <button
                  onClick={() => setIsAddingReservation(true)}
                  className="px-4 py-2 rounded-lg text-white font-medium text-xs flex items-center space-x-1 shadow transition-all active:scale-95 cursor-pointer shrink-0"
                  style={{ backgroundColor: "var(--red)" }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Manuel Rezervasyon Ekle</span>
                </button>
              </div>
            </div>

            {/* Reservations Cards List */}
            {filteredReservations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
                <CalendarDays className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-base font-bold text-gray-700">Kayıtlı Rezervasyon Bulunamadı</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  {reservationSearch
                    ? "Arama kriterlerinize uygun rezervasyon bulunamadı."
                    : "Henüz bu filtreye ait rezervasyon talebi bulunmuyor. Yeni bir rezervasyon ekleyebilirsiniz."}
                </p>
                <button
                  onClick={() => setIsAddingReservation(true)}
                  className="mt-4 px-4 py-2 rounded-lg bg-red-800 text-white text-xs font-semibold inline-flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Yeni Rezervasyon Ekle</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReservations.map((res) => {
                  const relativeLabel = getReservationRelativeTime(res.date);
                  const isPast = res.date < todayStr;
                  const cleanPhone = (res.customerPhone || "").replace(/\D/g, "");

                  return (
                    <div
                      key={res.id}
                      className={`bg-white rounded-2xl border transition-all p-5 shadow-sm flex flex-col justify-between relative ${
                        res.status === "pending"
                          ? "border-amber-300 ring-2 ring-amber-100"
                          : res.status === "cancelled"
                          ? "border-gray-200 opacity-60 bg-gray-50/50"
                          : "border-gray-200 hover:border-red-200 hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Card Top: Date, Time & Status Badge */}
                        <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
                          <div>
                            <div className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
                              <Calendar className="h-4 w-4 text-red-800 shrink-0" />
                              <span>{formatTurkishDateLong(res.date)}</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-600 flex items-center space-x-1 mt-0.5">
                              <Clock className="h-3.5 w-3.5 text-gray-400" />
                              <span>Saat: {res.time}</span>
                              <span className="mx-1 text-gray-300">•</span>
                              <span className={`text-[11px] font-medium px-1.5 py-0.2 rounded ${isPast ? "bg-gray-100 text-gray-500" : "bg-blue-50 text-blue-700"}`}>
                                {relativeLabel}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center space-x-1 ${
                              res.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-800"
                                : res.status === "cancelled"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-900 animate-pulse"
                            }`}
                          >
                            {res.status === "confirmed" ? (
                              <>
                                <CheckCircle2 className="h-3 w-3" />
                                <span>Onaylandı</span>
                              </>
                            ) : res.status === "cancelled" ? (
                              <>
                                <XCircle className="h-3 w-3" />
                                <span>İptal</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3 w-3" />
                                <span>Bekliyor</span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Customer Information */}
                        <div className="space-y-2 mb-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Müşteri</span>
                            <div className="text-base font-bold text-gray-900">{res.customerName}</div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <a
                              href={`tel:${res.customerPhone}`}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
                            >
                              <Phone className="h-3 w-3 text-emerald-600" />
                              <span>{res.customerPhone}</span>
                            </a>

                            {cleanPhone && (
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
                              >
                                <MessageCircle className="h-3 w-3 text-emerald-600" />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-gray-600 pt-1">
                            <span className="inline-flex items-center space-x-1">
                              <Users className="h-3.5 w-3.5 text-gray-400" />
                              <strong>{res.guests} Kişi</strong>
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="inline-flex items-center space-x-1">
                              <UtensilsCrossed className="h-3.5 w-3.5 text-gray-400" />
                              <span>{res.serviceType === "cafe" ? "Kafka Cafe" : "Van Kahvaltısı"}</span>
                            </span>
                          </div>

                          {res.note && (
                            <div className="bg-amber-50/70 border border-amber-100 rounded-lg p-2.5 text-xs text-amber-950 italic mt-2">
                              &ldquo;{res.note}&rdquo;
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Quick Actions */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">
                        <div className="flex items-center space-x-1.5">
                          {res.status !== "confirmed" && (
                            <button
                              onClick={() => handleUpdateReservationStatus(res.id, "confirmed")}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <Check className="h-3 w-3" />
                              <span>Onayla</span>
                            </button>
                          )}

                          {res.status !== "cancelled" && (
                            <button
                              onClick={() => handleUpdateReservationStatus(res.id, "cancelled")}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-all cursor-pointer"
                            >
                              İptal Et
                            </button>
                          )}

                          {res.status !== "pending" && (
                            <button
                              onClick={() => handleUpdateReservationStatus(res.id, "pending")}
                              className="px-2 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs transition-all cursor-pointer"
                              title="Beklemeye Al"
                            >
                              Beklet
                            </button>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <a
                            href={`/api/reservations/${res.id}/ics`}
                            download={`rezervasyon-${res.id}.ics`}
                            title="Takvime Ekle (.ics)"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </a>

                          <button
                            onClick={() => handleDeleteReservation(res.id, res.customerName)}
                            title="Rezervasyonu Sil"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 1: ITEMS */}
        {activeTab === "items" && (
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategoryFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    selectedCategoryFilter === "all"
                      ? "bg-red-800 text-white border-red-800"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Tümü
                </button>
                {data.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      selectedCategoryFilter === cat.id
                        ? "bg-red-800 text-white border-red-800"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-grow md:w-64">
                  <input
                    type="text"
                    placeholder="Ürünlerde ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                    style={{ borderColor: "var(--line)" }}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <button
                  onClick={openAddItem}
                  className="px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center space-x-1 shadow transition-all active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "var(--red)", boxShadow: "var(--shadow-red)" }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Yeni Ürün</span>
                </button>
              </div>
            </div>

            {/* Items Listing Table/Card List */}
            {filteredWithIndex.length > 0 ? (
              <div className="bg-white border rounded-xl overflow-hidden shadow-sm" style={{ borderColor: "var(--line)" }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-semibold text-xs border-b" style={{ borderColor: "var(--line)" }}>
                        <th className="p-4 w-20">Görsel</th>
                        <th className="p-4">Ürün Adı</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Fiyat</th>
                        <th className="p-4 text-right">Sıra</th>
                        <th className="p-4 text-center">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm" style={{ borderColor: "var(--line)" }}>
                      {filteredWithIndex.map(({ item, index }) => {
                        const categoryName = data.categories.find((c) => c.id === item.category)?.shortLabel || item.category;
                          return (
                            <tr key={item.id} className="hover:bg-[#fffcf7] transition-all">
                              <td className="p-4">
                                <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200">
                                  {item.image ? (
                                    <Image
                                      src={item.image}
                                      alt={item.imageAlt || item.name}
                                      fill
                                      sizes="48px"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <UtensilsCrossed className="absolute inset-0 m-auto h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="font-semibold text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-500 line-clamp-1 max-w-sm mt-0.5">{item.description}</div>
                                <div className="flex gap-1 mt-1">
                                  {item.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="p-4 text-gray-600 font-medium">{categoryName}</td>
                              <td className="p-4 font-bold text-red-900">
                                <div>{item.price}</div>
                                {item.priceNote && <div className="text-[10px] text-gray-400 font-normal">{item.priceNote}</div>}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-1">
                                  <button
                                    onClick={() => moveItemOrder(index, "up")}
                                    disabled={index === 0}
                                    className="p-1 rounded text-gray-400 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                                  >
                                    <ChevronUp className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => moveItemOrder(index, "down")}
                                    disabled={index === data.items.length - 1}
                                    className="p-1 rounded text-gray-400 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <button
                                    onClick={() => openEditItem(item)}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer"
                                    title="Düzenle"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>

                                  <button
                                    onClick={() => duplicateItem(item)}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-green-600 hover:border-green-200 transition-all cursor-pointer"
                                    title="Kopyala"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </button>

                                  <button
                                    onClick={() => deleteItem(item.id, item.name)}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer"
                                    title="Sil"
                                  >
                                    <Trash className="h-4 w-4" />
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
            ) : (
              <div className="bg-white border rounded-xl p-12 text-center text-gray-500" style={{ borderColor: "var(--line)" }}>
                Arama kriterlerine uygun ürün bulunamadı.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CATEGORIES */}
        {activeTab === "categories" && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={openAddCategory}
                className="px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center space-x-1 shadow transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: "var(--red)", boxShadow: "var(--shadow-red)" }}
              >
                <Plus className="h-4 w-4" />
                <span>Yeni Kategori</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.categories.map((cat, index) => {
                const count = data.items.filter((item) => item.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-xl border p-5 shadow-sm flex space-x-4 relative"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                      {cat.image ? (
                        <Image src={cat.image} alt={cat.imageAlt} fill className="object-cover" />
                      ) : (
                        <Layers className="absolute inset-0 m-auto h-7 w-7 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 font-serif text-lg leading-tight">{cat.label}</h3>
                          <div className="text-xs font-semibold text-amber-800 mt-0.5">Etiket: {cat.shortLabel}</div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => moveCategoryOrder(index, "up")}
                            disabled={index === 0}
                            className="p-1 rounded text-gray-400 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => moveCategoryOrder(index, "down")}
                            disabled={index === data.categories.length - 1}
                            className="p-1 rounded text-gray-400 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{cat.description}</p>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {count} ürün
                        </span>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditCategory(cat)}
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteCategory(cat.id, cat.label)}
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          >
                            <Trash className="h-3.5 w-3.5" />
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
      </main>

      {/* PRODUCT EDIT/ADD DIALOG */}
      {(editingItem || isAddingItem) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            {/* Dynamic Product Preview Side (Wow factor!) */}
            <div className="w-full md:w-2/5 bg-[#f4ecdf] border-r border-[#e5d8bf] p-6 flex flex-col justify-center items-center">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-4">Kart Önizleme</span>
              
              {/* EXACT CARD REPLICATED FROM LIVE MENU */}
              {(() => {
                const previewVisibleTag = itemForm.tags?.find((tag) => tag === "Öne çıkan" || tag === "Yeni");
                const previewMetaLabel =
                  itemForm.priceNote ||
                  itemForm.tags?.find((tag) => tag !== previewVisibleTag) ||
                  "Günlük hazırlanır";
                  
                return (
                  <div
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
                    className="w-full max-w-[340px] overflow-hidden"
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
                            backgroundColor: "#7a1b22",
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
                            color: "#7a1b22",
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
                            color: "#7a1b22",
                          }}
                        >
                          <ChevronRight size={15} strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Form Fields */}
            <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[80vh] md:max-h-none">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-serif text-[#211d1b]">
                  {isAddingItem ? "Yeni Ürün Ekle" : "Ürünü Düzenle"}
                </h2>
                <button onClick={() => { setEditingItem(null); setIsAddingItem(false); }} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Adı</label>
                    <input
                      type="text"
                      value={itemForm.name || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Geleneksel Van Kahvaltısı"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
                    <select
                      value={itemForm.category || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                    >
                      {data.categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Fiyat</label>
                    <input
                      type="text"
                      value={itemForm.price || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="₺450"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Fiyat Notu (İsteğe Bağlı)</label>
                    <input
                      type="text"
                      value={itemForm.priceNote || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, priceNote: e.target.value }))}
                      placeholder="kişi başı · en az 2 kişilik"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                    />
                  </div>
                </div>

                {/* Description & Story */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Kısa Açıklama</label>
                  <textarea
                    value={itemForm.description || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Otlu peynir, murtuğa, kavut, cacık, kete, bal-kaymak ve sınırsız çay."
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800 h-16 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ürünün Hikayesi (Detay Sayfasında Görünür)</label>
                  <textarea
                    value={itemForm.story || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, story: e.target.value }))}
                    placeholder="1978'den beri masanın ortasına birlikte yenmek üzere kurduğumuz Van sofrası..."
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800 h-20 resize-none"
                  />
                </div>

                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Görseli</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={itemForm.image || ""}
                      onChange={(e) => setItemForm((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="/images/spread.webp"
                      className="flex-grow px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                    />
                    <label className="px-4 py-2 border rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center space-x-1 cursor-pointer shrink-0">
                      {uploadingImage ? (
                        <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-red-800 border-t-transparent" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      <span>{uploadingImage ? "Yükleniyor..." : "Yükle"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={itemForm.imageAlt || ""}
                    onChange={(e) => setItemForm((prev) => ({ ...prev, imageAlt: e.target.value }))}
                    placeholder="Görsel açıklama (Alt metin)"
                    className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white focus:outline-none focus:border-red-800 mt-1"
                  />
                  {uniqueImages.length > 0 && (
                    <div className="mt-2">
                      <span className="block text-[10px] font-semibold text-gray-500 mb-1">
                        Sitedeki Mevcut Görseller (Seçmek için tıklayın):
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-thin">
                        {uniqueImages.map((imgUrl) => (
                          <button
                            key={imgUrl}
                            type="button"
                            onClick={() => setItemForm((prev) => ({
                              ...prev,
                              image: imgUrl,
                              imageAlt: prev.imageAlt || `${prev.name || "Ürün"} görseli`
                            }))}
                            className={`relative h-10 w-10 border rounded overflow-hidden shrink-0 hover:border-red-800 transition-all ${itemForm.image === imgUrl ? "border-red-800 ring-2 ring-red-100" : "border-gray-200"}`}
                          >
                            <Image src={imgUrl} alt="Mevcut Görsel" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags Management */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Etiketler</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
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
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            exists
                              ? "bg-amber-100 border-amber-300 text-amber-900 font-semibold"
                              : "bg-white border-gray-200 text-gray-600"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Özel etiket ekle..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="flex-grow px-3 py-1.5 border rounded-lg text-xs bg-white focus:outline-none focus:border-red-800"
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
                      className="px-3 py-1.5 rounded-lg bg-gray-800 text-white font-semibold text-xs cursor-pointer"
                    >
                      Ekle
                    </button>
                  </div>
                </div>

                {/* Details List (Details) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Detayları (Örn: Sınırsız çay vb.)</label>
                  <ul className="space-y-1.5 mb-2">
                    {itemForm.details?.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-1 text-xs">
                        <span>{detail}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = itemForm.details?.filter((_, i) => i !== idx);
                            setItemForm((prev) => ({ ...prev, details: next }));
                          }}
                          className="text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
                        >
                          Sil
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Yeni özellik detayı yaz..."
                      value={newDetailInput}
                      onChange={(e) => setNewDetailInput(e.target.value)}
                      className="flex-grow px-3 py-1.5 border rounded-lg text-xs bg-white focus:outline-none focus:border-red-800"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newDetailInput) return;
                        const current = itemForm.details || [];
                        setItemForm((prev) => ({ ...prev, details: [...current, newDetailInput] }));
                        setNewDetailInput("");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 text-white font-semibold text-xs cursor-pointer"
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 border-t pt-4 border-gray-100">
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsAddingItem(false); }}
                  className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  onClick={saveItemForm}
                  className="px-5 py-2 rounded-lg text-white font-semibold text-sm flex items-center space-x-1 cursor-pointer"
                  style={{ backgroundColor: "var(--red)" }}
                >
                  <Check className="h-4 w-4" />
                  <span>Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY EDIT/ADD DIALOG */}
      {(editingCategory || isAddingCategory) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl p-6 md:p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif text-[#211d1b]">
                {isAddingCategory ? "Yeni Kategori Ekle" : "Kategoriyi Düzenle"}
              </h2>
              <button onClick={() => { setEditingCategory(null); setIsAddingCategory(false); }} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori Başlığı</label>
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
                  placeholder="Sıcak Yemekler"
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Kısa Etiket (Menü Üstü Navbar İçin)</label>
                <input
                  type="text"
                  value={categoryForm.shortLabel || ""}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, shortLabel: e.target.value }))}
                  placeholder="Sıcaklar"
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori Açıklaması</label>
                <textarea
                  value={categoryForm.description || ""}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Bakır sahanda tereyağı hâlâ cızırdarken masaya gelenler."
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori Görseli</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={categoryForm.image || ""}
                    onChange={(e) => setCategoryForm((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="/images/sicak.webp"
                    className="flex-grow px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  />
                  <label className="px-4 py-2 border rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center space-x-1 cursor-pointer shrink-0">
                    {uploadingImage ? (
                      <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-red-800 border-t-transparent" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>{uploadingImage ? "Yükleniyor..." : "Yükle"}</span>
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
                  placeholder="Kategori görsel açıklaması (Alt)"
                  className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white focus:outline-none focus:border-red-800 mt-1"
                />
                {uniqueImages.length > 0 && (
                  <div className="mt-2">
                    <span className="block text-[10px] font-semibold text-gray-500 mb-1">
                      Sitedeki Mevcut Görseller (Seçmek için tıklayın):
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-thin">
                      {uniqueImages.map((imgUrl) => (
                        <button
                          key={imgUrl}
                          type="button"
                          onClick={() => setCategoryForm((prev) => ({
                            ...prev,
                            image: imgUrl,
                            imageAlt: prev.imageAlt || `${prev.label || "Kategori"} görseli`
                          }))}
                          className={`relative h-10 w-10 border rounded overflow-hidden shrink-0 hover:border-red-800 transition-all ${categoryForm.image === imgUrl ? "border-red-800 ring-2 ring-red-100" : "border-gray-200"}`}
                        >
                          <Image src={imgUrl} alt="Mevcut Görsel" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 border-t pt-4 border-gray-100">
              <button
                type="button"
                onClick={() => { setEditingCategory(null); setIsAddingCategory(false); }}
                className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={saveCategoryForm}
                className="px-5 py-2 rounded-lg text-white font-semibold text-sm flex items-center space-x-1 cursor-pointer"
                style={{ backgroundColor: "var(--red)" }}
              >
                <Check className="h-4 w-4" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL RESERVATION ADD DIALOG */}
      {isAddingReservation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 md:p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#211d1b]">
                  Yeni Rezervasyon Ekle
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Telefonla veya dükkanda alınan rezervasyonu girin; doğrudan iPhone takviminize işlensin.
                </p>
              </div>
              <button
                onClick={() => setIsAddingReservation(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Müşteri Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={reservationForm.customerName || ""}
                    onChange={(e) => setReservationForm((prev) => ({ ...prev, customerName: e.target.value }))}
                    placeholder="örn. Ali Yılmaz"
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon Numarası *</label>
                  <input
                    type="tel"
                    required
                    value={reservationForm.customerPhone || ""}
                    onChange={(e) => setReservationForm((prev) => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tarih *</label>
                  <input
                    type="date"
                    required
                    value={reservationForm.date || ""}
                    onChange={(e) => setReservationForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Saat *</label>
                  <select
                    value={reservationForm.time || "10:00"}
                    onChange={(e) => setReservationForm((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  >
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Kişi Sayısı</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={reservationForm.guests || 2}
                    onChange={(e) => setReservationForm((prev) => ({ ...prev, guests: Number(e.target.value) || 2 }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Hizmet Türü</label>
                  <select
                    value={reservationForm.serviceType || "breakfast"}
                    onChange={(e) => setReservationForm((prev) => ({ ...prev, serviceType: e.target.value as ServiceType }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800"
                  >
                    <option value="breakfast">Van Kahvaltısı</option>
                    <option value="cafe">Kafka Cafe</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Not / Özel İstek</label>
                <textarea
                  value={reservationForm.note || ""}
                  onChange={(e) => setReservationForm((prev) => ({ ...prev, note: e.target.value }))}
                  placeholder="Masa konumu, bebek sandalyesi vb."
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:border-red-800 h-20 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 border-t pt-4 border-gray-100">
              <button
                type="button"
                onClick={() => setIsAddingReservation(false)}
                className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSaveReservationForm}
                className="px-5 py-2 rounded-lg text-white font-semibold text-sm flex items-center space-x-1 cursor-pointer"
                style={{ backgroundColor: "var(--red)" }}
              >
                <Check className="h-4 w-4" />
                <span>Kaydet & Takvime Ekle</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


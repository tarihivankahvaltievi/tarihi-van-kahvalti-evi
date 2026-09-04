import Image from "next/image";
import Link from "next/link";
import styles from "./about-story.module.css";

export function AboutStory({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  return (
    <div className={styles.section1}>
      <div
        className={styles.logoVectorImg}
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-anchor-placement="top-bottom"
      >
        <Image
          src="/hamour/main-logo-vector-2.png"
          alt="Hamour Vector Logo"
          width={65}
          height={65}
          className={styles.vectorIcon}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.article}>
              <h2
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-bottom"
                className={styles.title}
              >
                {isEn ? "Meet Hamour Delights" : "Hamour Lezzetleriyle Tanışın"}
              </h2>

              <p
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-bottom"
                className={styles.quote}
              >
                {isEn
                  ? "For us, taste is an invitation that defies the ordinary and routine of the day. Every flavor created with passion from Hamour's kitchen is ready to turn into an unforgettable memory on your palate! We look forward to turning even the smallest victories into a great celebration with Hamour flavors in the ordinary flow of life!"
                  : "Bizim için lezzet, sıradanlığa ve günün rutinine meydan okuyan bir davettir. Hamour’un mutfağından aşkla çıkan her tat, damağınızda unutulmaz bir anıya dönüşmeye hazır! Hayatın olağan akışında, en küçük zaferleri dahi Hamour lezzetleriyle büyük bir kutlamaya çevirmek için sabırsızlanıyoruz!"}
              </p>

              <div className={styles.richtext}>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-anchor-placement="top-bottom"
                >
                  <span>
                    {isEn
                      ? 'We bring you fresh, healthy, and dearly missed "signature" flavors with Hamour\'s elegant touch. You can try our rich breakfast options for an energetic start to the day, and enjoy our crisp croissants accompanied by freshly brewed tea or coffee. Throughout the day, you are invited to a unique culinary journey in the warm atmosphere of Hamour with our carefully prepared delicacies and extraordinary flavors!'
                      : 'Taze, sağlıklı ve özlenen "o" lezzetleri, Hamour’un zarif dokunuşuyla sizlere sunuyoruz. Güne enerjik bir başlangıç için zengin kahvaltı seçeneklerimizi deneyebilir, kahve veya çay eşliğinde çıtır kruvasanlarımızın keyfini sürebilirsiniz. Gün boyu, özenle hazırlanan tatlarımız ve benzersiz lezzetlerimizle Hamour’un sıcak atmosferinde eşsiz bir lezzet yolculuğuna davetlisiniz!'}
                  </span>
                </p>
              </div>

              <Link
                href="/hikayemiz"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-bottom"
                className={styles.btn}
              >
                {isEn ? "Our Story" : "Hikayemiz"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

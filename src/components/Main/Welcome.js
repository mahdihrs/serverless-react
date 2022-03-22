import React from 'react'

export default function Welcome() {
  const [gallery, setGallery] = React.useState(null);

  const fetchGallery = async() => {
    const galleryList = await fetch(`${process.env.REACT_APP_BASE_URL}/gallery`);
    const galleryFormatted = await galleryList.json();
    setGallery(galleryFormatted);
  }

  React.useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="scene" id="welcome">
      <article className="content">
        <div className="gallery">
          {gallery?.map((list) => <img key={list.alt} className={list.class} src={list.src} alt={list.alt} />)}
        </div>
        <h1>Welcome to the Landon&nbsp;Hotel</h1>
        <p>The original Landon perseveres after 50 years in the heart of West London. The West End neighborhood has something for everyone—from theater to dining to historic sights. And the not-to-miss Rooftop Cafe is a great place for travelers and locals to engage over drinks, food, and good&nbsp;conversation. &nbsp;To learn more about the Landon Hotel in the West End, browse our website and <a href="files/landon_information_sheet_London.pdf">download our handy information sheet</a>.</p>
      </article>
    </div>
  )
}

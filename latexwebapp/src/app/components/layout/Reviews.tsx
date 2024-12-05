const reviewsData = [
    {
      name: "Jane Smith",
      date: "May 5, 2023",
      text: "I love PaperLeaf! It's so much faster than typing out all my equations. I use it all the time for my physics homework.",
      rating: 5,
    },
    {
      name: "Mike Johnson",
      date: "April 12, 2023",
      text: "I've been using PaperLeaf for a few weeks now and I'm really impressed with how accurate it is. It's saved me a lot of time when writing up my math notes.",
      rating: 5,
    },
  ];
  
  export default function Reviews() {
    return (
      <div className="reviews-container">
        {reviewsData.map((review, index) => (
          <div key={index} className="review-card">
            <h2 className="review-name">{review.name}</h2>
            <p className="review-date">{review.date}</p>
            <div className="review-rating">
            {Array.from({ length: review.rating }).map((_, i) => (<span key={i} className="star">⭐</span>))}
            <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
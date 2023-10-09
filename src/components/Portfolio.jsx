import phone from '../assets/phone.png';

const Portfolio = () => {
  return (
    <div className="card-portfolio align-element py-20">
      <h2 className="font-semibold">Portfolio & Insights</h2>
      <img src={phone} alt="data-set" className="object-cover" />
    </div>
  );
};

export default Portfolio;

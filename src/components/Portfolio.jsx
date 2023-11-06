import phone from '../assets/phone.png';

const Portfolio = () => {
  return (
    <div className="card-portfolio px-6 sm:px-16 lg:px-20 border border-b-0">
      <h2 className="text-slate-800 md:py-8 text-center font-semibold text-3xl sm:text-5xl lg:text-left">
        Portfolio & Insights
      </h2>
      <img src={phone} alt="data-set" className="object-cover" />
    </div>
  );
};

export default Portfolio;

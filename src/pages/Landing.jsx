import { Card, SectionTitle } from '../components';
import location from '../assets/location.png';

const Landing = () => {
  return (
    <div>
      <Card
        title="Data Repository"
        imageUrl={location}
        description="
        Our platform serves as a comprehensive data repository where users 
        can easily access a wealth of valuable information on topics 
        ranging from the economy and the environment to education and more."
      />

      <Card
        title="Market Finder"
        description="
        Our platform serves as a comprehensive data repository 
        where users can easily access a wealth of valuable information 
        on topics ranging from the economy and the environment to 
        education and more. "
        position="right"
      />

      <SectionTitle
        title="Uncommon Knowledge"
        subtitle="Collect vital data and thought-provoking insights into meaningful subjects."
      />
    </div>
  );
};

export default Landing;

import logo from '../assets/joinlogo.jpg';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import linkedin from '../assets/linkin.png';
import google from '../assets/google.png';

import FooterLink from './FooterLink';

const Footer = () => {
  return (
    <div className="bg-primary-500 text-white p-4">
      <div className="container align-element">
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-4">
          {/* Footer Content for Column 1 */}
          <div className="mb-4 lg:mb-0   lg:col-span-2 column-one">
            <img
              src={logo}
              alt="JoinLogo"
              className="w-full h-20 object-cover footer-header"
            />
            <p>
              <b>Steady variables data Repository</b> <br />
              is a platform serves as a comprehensive data repository where
              users can easily access a wealth of valuable information on topics
              ranging from the economy and the environment to education and
              more.
            </p>
            <div className="column-one-social">
              <img
                src={instagram}
                alt="instagram"
                className="w-full h-20 object-cover"
              />
              <img
                src={google}
                alt="google"
                className="w-full h-20 object-cover"
              />
              <img
                src={linkedin}
                alt="linkedin"
                className="w-full h-20 object-cover"
              />

              <img
                src={facebook}
                alt="facebook"
                className="w-full h-20 object-cover"
              />
            </div>
          </div>

          {/* Footer Content for Column 2 */}
          <div className="mb-4 lg:mb-0">
            <h3 className="text-lg font-semibold text-footer footer-header">
              Quick Links
            </h3>
            {/* Add your content for Column 2 here */}
            <FooterLink title="about" link="/" />
            <FooterLink title="our mission" link="/" />
            <FooterLink title="our service" link="/" />
            <FooterLink title="FAQ" link="/" />
          </div>

          {/* Footer Content for Column 3 */}
          <div className="mb-4 lg:mb-0">
            <h3 className="text-lg font-semibold text-footer footer-header">
              Legal
            </h3>
            {/* Add your content for Column 3 here */}
            <FooterLink title="terms" link="/" />
            <FooterLink title="privacy" link="/" />
            <FooterLink title="settings" link="/" />
          </div>

          {/* Footer Content for Column 4 */}
          <div className="mb-4 lg:mb-0">
            <h3 className="text-lg font-semibold text-footer footer-header">
              Contact
            </h3>
            {/* Add your content for Column 4 here */}
            <FooterLink title="our service" link="/" />
          </div>
        </div>
      </div>

      <div className="h-[0px] border border-white line"></div>
      <div className="text-white font-normal text-center copy-right">
        Copyright &copy; {new Date().getFullYear()} By Steady Data. All Rights
        Reserved
      </div>
    </div>
  );
};

export default Footer;

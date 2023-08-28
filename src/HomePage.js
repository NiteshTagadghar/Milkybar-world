import React from 'react';
import backgroundImage from './utils/background.png';
import imageOne from './utils/my passport.png';
import passportTwo from './utils/passport bottom.png';
import passport from './utils/dummy-profile-pic-300x300-1.png'
import eidtButton from './utils/edit-btn 1.png'
import { Link } from 'react-router-dom';

const MobileComponent = () => {

    const savedImage = localStorage.getItem('capturedImage');
    let imageUrl = passport;
    let name = 'Your Name';

    if (savedImage) {
        const parsedImage = JSON.parse(savedImage);
        console.log(parsedImage);
        imageUrl = parsedImage.imageUrl;
        name = parsedImage.name;
        console.log("img" , imageUrl);
    }
  return (
    <div className="centeredScreen">
      <div className="mobileComponent">
        <div className="navigation">Navigation Section</div>
        <div className="imageSection">
          <img src={backgroundImage} alt="Background Image" className="backgroundImage" />
          <div className="overlayImages">
            <img src={imageOne} alt="Shop 1" className="shopImage" />
            <div className="overlayDiv">
             <div className='image-one'>
                <div style={{position:'relative'}}>
                <img src={imageUrl} className='image-one-passport' />
                <Link to='/'>
                <img src={eidtButton} style={{position:'absolute',top:"17%", right:'-2%', height:'30px'}} className='edit-button' />
                </Link>
                </div>
                <div className='passport-details'>
                    <h3 style={{color:'blue', fontSize:'15px'}}>Name</h3>
                    <h1 style={{color:'skyblue', fontSize:'20px'}}>{name}</h1>
                    <p style={{color:'yellow', fontSize:'10px', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}> IAM READY TO DISCOVER THE WORLD!</p>
                </div>
             </div>
              <img src={passportTwo} className="overlayImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileComponent;

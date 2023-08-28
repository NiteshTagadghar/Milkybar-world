import React, { useState, useRef, useEffect } from 'react';
import closeButton from './utils/close-btn.png';
import cameraButton from './utils/shutter button.png'
import retakeButton from './utils/retake button.png'
import { Link } from 'react-router-dom';

const ImageApp = () => {
    const [showCamera, setShowCamera] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);

    useEffect(() => {
        if (showCamera) {
            startCameraPreview();
        } else {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
                mediaStreamRef.current = null;
            }
        }
    }, [showCamera]);

    useEffect(() => {
        const savedImage = localStorage.getItem('capturedImage');
        if (savedImage) {
            const parsedImage = JSON.parse(savedImage);
            setImageUrl(parsedImage.imageUrl);
            setName(parsedImage.name);
        }
    }, []);

    const startCameraPreview = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        mediaStreamRef.current = stream;
                    }
                })
                .catch(error => console.error('Error accessing camera:', error));
        }
    };

    const handleCapture = () => {
        setImageUrl('');
        setName('');
        setShowCamera(true);
    };

    const handleRetake = () => {
        setImageUrl('');
        setName('');
        setShowCamera(true);
    };

    const handleSave = () => {
        if (videoRef.current && name) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const capturedImageUrl = canvas.toDataURL('image/jpeg');

            setImageUrl(capturedImageUrl);
            setShowCamera(false);

            const imageData = { imageUrl: capturedImageUrl, name };
            localStorage.setItem('capturedImage', JSON.stringify(imageData));

            alert('Image and name saved successfully!');
            setName(name);
        } else {
            alert('Please enter a valid name First');
        }
    };

    const handleNameChange = event => {
        const newValue = event.target.value;
        if (/^[A-Za-z\s]*$/.test(newValue) && newValue.length <= 30) {
            setName(newValue);
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid name');
        }
    };

    return (
        <div >
            {imageUrl ? (
                <div className='container'>
                    <div style={{ backgroundImage: `url(${imageUrl})` }} className='take-image-container'>
                    <Link to='/display'>
                        
                        <div className='close-button'>
                            <img className='' src={closeButton} alt="close Button" />

                        </div>
                        </Link>
                        <div className='camera-button'>
                            <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleRetake}>
                                <img className='' src={retakeButton} alt="camera button" />
                            </button>

                        </div>
                    </div>
                    <div>
                        <input type='text' placeholder='Enter your first name' className='take-image-input' value={name} />
                    </div>
                    <div>
                    <Link to='/display'>
                        
                        <button  className='text-image-button'>
                            Save
                        </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    {!showCamera && (
                        <div className='container'>
                            <div className='take-image-container'>
                            <Link to='/display'>
                                <div className='close-button'>
                                    <img className='' src={closeButton} alt="close Button" />

                                </div>
                                </Link>
                                <div className='camera-button'>
                                    <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleCapture} >
                                        <img className='' src={retakeButton} alt="camera button" />
                                    </button>

                                </div>
                            </div>
                            <div>
                                <input type='text' placeholder='Enter your first name' className='take-image-input' value={name} onChange={handleNameChange} />

                            </div>
                            <div>
                                <button className='text-image-button'>
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                    {showCamera &&
                        <div className='container'>

                            <div className='take-image-container'>
                            <Link to='/display'>
                                <div className='close-button'>
                                    <img className='' src={closeButton} alt="close Button" />

                                </div>
                                </Link>
                                <video autoPlay muted playsInline ref={videoRef} className='video-element' />

                                <div className='camera-button'>
                                    <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleSave}>
                                        <img className='' src={cameraButton} alt="camera button" />
                                    </button>

                                </div>
                            </div>
                            <div>
                                <input type='text' placeholder='Enter your first name' className='take-image-input' value={name} onChange={handleNameChange} />

                            </div>
                            <div>
                                <button onClick={handleSave} className='text-image-button'>
                                    Save
                                </button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default ImageApp;

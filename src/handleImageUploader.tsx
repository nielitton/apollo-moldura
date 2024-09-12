import { useState } from 'react';
import './imageEditor.css'
import html2canvas from 'html2canvas';

const ImageEditor = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadImage = () => {
        const container = document.querySelector('.image-frame-container');
        html2canvas(container).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'imagem_com_moldura.png';
            link.click();
        });
    };

    return (
        <div className="editor-container">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
                placeholder="Escolha uma imagem"
            />
            <span>Caso sua imagem não se encaixe com a moldura, não se preocupe, quando você fizer o download, ela se ajustara</span>
            <div className="image-frame-container">
                {image &&
                    <div>
                        <img src={image} alt="Imagem" className="image" />
                        <img src={'/frames/moldura.png'} alt="Moldura" className="frame" />
                    </div>
                }
            </div>
            <div>
                {image && (
                    <button onClick={downloadImage} className="download-button">
                        Baixar Imagem
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageEditor;

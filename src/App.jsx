import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

function App() {
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");
  const canvasRef = useRef();

  const handleGenerate = (e) => {
    e.preventDefault();
    console.log(e);
    setQrValue(input);
    setInput("");
  };
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "QR.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <main>
      <h1>QR Code Generator</h1>
      <form onSubmit={handleGenerate}>
        <input
          id="input"
          type="text"
          placeholder="https://example.com"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit">Generate QR</button>
      </form>
      <div className="qr-code-container">
        {qrValue && (
          <>
            <QRCodeCanvas ref={canvasRef} value={qrValue} />
            <button type="button" onClick={handleDownload}>
              Download QR
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default App;

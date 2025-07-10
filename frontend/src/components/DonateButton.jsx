// import React, { useState, useRef, useEffect } from "react";

// const ExpandableDonateButton = () => {
//   const [expanded, setExpanded] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef(null);

//   // Focus input when expanded
//   useEffect(() => {
//     if (expanded && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [expanded]);

//   const handleExpand = () => setExpanded(true);

//   const handleCollapse = () => {
//     setExpanded(false);
//     setAmount("");
//   };

//   const handleDonate = async () => {
//     if (!amount || isNaN(amount) || Number(amount) < 1) {
//       alert("Please enter a valid amount (minimum $1).");
//       return;
//     }
//     setLoading(true);
//     try {
//       // Replace with your actual POST endpoint
//       const response = await fetch("http://localhost:3001/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: Math.round(Number(amount) * 100) }),
//       });
//       const { url } = await response.json();
//       if (url) window.location.href = url;
//     } catch (error) {
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//       handleCollapse();
//     }
//   };

//   return (
//     <div style={{ position: "relative", display: "inline-block" }}>
//       {!expanded ? (
//         <button
//           onClick={handleExpand}
//           style={{
//             background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
//             color: "white",
//             padding: "16px 40px",
//             fontSize: "20px",
//             border: "none",
//             borderRadius: "8px",
//             fontWeight: 600,
//             cursor: "pointer",
//             boxShadow: "0 2px 8px rgba(67, 160, 71, 0.15)",
//             transition: "background 0.3s",
//           }}
//         >
//           Donate
//         </button>
//       ) : (
//         <div
//           style={{
//             position: "absolute",
//             top: "-10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 10,
//             background: "white",
//             borderRadius: "18px",
//             boxShadow: "0 6px 32px rgba(34, 139, 34, 0.12)",
//             padding: "32px 28px 24px 28px",
//             minWidth: "290px",
//             textAlign: "center",
//             fontFamily: "Merriweather, serif",
//             animation: "fadeIn 0.2s",
//           }}
//         >
//           <div style={{ marginBottom: "14px", fontWeight: 700, color: "#256029", fontSize: "1.2rem" }}>
//             Support our cause
//           </div>
//           <div style={{ color: "#388e3c", fontSize: "1rem", marginBottom: "18px" }}>
//             Your donation helps us make a difference!
//           </div>
//           <input
//             ref={inputRef}
//             type="number"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//             min="1"
//             placeholder="Amount ($)"
//             style={{
//               padding: "10px",
//               fontSize: "17px",
//               border: "2px solid #81c784",
//               borderRadius: "7px",
//               width: "100px",
//               textAlign: "center",
//               marginBottom: "16px",
//               outline: "none",
//             }}
//             disabled={loading}
//           />
//           <div>
//             <button
//               onClick={handleDonate}
//               disabled={loading}
//               style={{
//                 background: loading
//                   ? "#a5d6a7"
//                   : "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
//                 color: "white",
//                 padding: "12px 28px",
//                 fontSize: "17px",
//                 border: "none",
//                 borderRadius: "7px",
//                 fontWeight: 600,
//                 cursor: loading ? "not-allowed" : "pointer",
//                 marginRight: "8px",
//                 marginTop: "8px",
//               }}
//             >
//               {loading ? "Processing..." : `Donate ₹${amount && Number(amount) > 0 ? amount : ""}`}
//             </button>
//             <button
//               onClick={handleCollapse}
//               disabled={loading}
//               style={{
//                 background: "transparent",
//                 color: "#388e3c",
//                 border: "none",
//                 fontWeight: 600,
//                 fontSize: "15px",
//                 cursor: "pointer",
//                 marginLeft: "8px",
//                 marginTop: "8px",
//                 textDecoration: "underline",
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpandableDonateButton;
import React, { useState, useRef, useEffect } from "react";

const ExpandableDonateButton = () => {
  const [expanded, setExpanded] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus input when expanded
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  // Only enable donate if amount is a valid number >= 1
  const isValidAmount =
    amount !== "" && !isNaN(amount) && Number(amount) >= 1;

  const handleExpand = () => setExpanded(true);

  const handleCollapse = () => {
    setExpanded(false);
    setAmount("");
  };

  const handleDonate = async () => {
    if (!isValidAmount) return; // Button is disabled if not valid, but double check

    setLoading(true);
    try {
     
      if (!response.ok) {
        setLoading(false);
        handleCollapse();
        // Optionally show a toast or error message here
        return;
      }
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      handleCollapse();
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {!expanded ? (
        <button
          onClick={handleExpand}
          style={{
            background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
            color: "white",
            padding: "16px 40px",
            fontSize: "20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(67, 160, 71, 0.15)",
            transition: "background 0.3s",
          }}
        >
          Donate
        </button>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: "white",
            borderRadius: "18px",
            boxShadow: "0 6px 32px rgba(34, 139, 34, 0.12)",
            padding: "32px 28px 24px 28px",
            minWidth: "290px",
            textAlign: "center",
            fontFamily: "Merriweather, serif",
            animation: "fadeIn 0.2s",
          }}
        >
          <div style={{ marginBottom: "14px", fontWeight: 700, color: "#256029", fontSize: "1.2rem" }}>
            Support our cause
          </div>
          <div style={{ color: "#388e3c", fontSize: "1rem", marginBottom: "18px" }}>
            Your donation helps us make a difference!
          </div>
          <input
            ref={inputRef}
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="1"
            placeholder="Amount (₹)"
            style={{
              padding: "10px",
              fontSize: "17px",
              border: "2px solid #81c784",
              borderRadius: "7px",
              width: "100px",
              textAlign: "center",
              marginBottom: "16px",
              outline: "none",
            }}
            disabled={loading}
          />
          <div>
            <button
              onClick={handleDonate}
              disabled={loading || !isValidAmount}
              style={{
                background: loading || !isValidAmount
                  ? "#a5d6a7"
                  : "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
                color: "white",
                padding: "12px 28px",
                fontSize: "17px",
                border: "none",
                borderRadius: "7px",
                fontWeight: 600,
                cursor: loading || !isValidAmount ? "not-allowed" : "pointer",
                marginRight: "8px",
                marginTop: "8px",
              }}
            >
              {loading
                ? "Processing..."
                : `Donate ₹${amount && Number(amount) > 0 ? amount : ""}`}
            </button>
            <button
              onClick={handleCollapse}
              disabled={loading}
              style={{
                background: "transparent",
                color: "#388e3c",
                border: "none",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "8px",
                marginTop: "8px",
                textDecoration: "underline",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableDonateButton;

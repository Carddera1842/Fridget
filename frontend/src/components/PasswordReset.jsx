import { useState } from "react";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [resetUsername, setResetUsername] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tokenSent, setTokenSent] = useState(false);

  const handlePasswordResetRequest = async () => {
    if (!resetUsername) {
      alert("Please enter your username to request a password reset.");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/users/request-password-reset?username=${resetUsername}`, {
      method: "POST",
    });
    const result = await response.text();
    if (result.includes("Password reset token: ")) {
      setResetToken(result.split(": ")[1]);
      setTokenSent(true);
    } else {
      alert(result);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetToken || !newPassword) {
      alert("Please enter the token and your new password.");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/users/reset-password?token=${resetToken}&newPassword=${newPassword}`, {
      method: "POST",
    });
    const result = await response.text();
    alert(result);
    if (result === "Password reset successfully") {
      setResetToken("");
      setNewPassword("");
      setResetUsername("");
      setTokenSent(false);
    }
  };

  return (
    <div className="password-reset" id="rcorners2">
      <h2>Reset Password</h2>
      <div>
        <input type="text" placeholder="Enter your username" value={resetUsername} onChange={(e) => setResetUsername(e.target.value)} />
        <button onClick={handlePasswordResetRequest}>Request Reset Token</button>
      </div>
      {tokenSent && (
        <div>
          <h3>Enter Token and New Password</h3>
          <input type="text" placeholder="Reset Token" value={resetToken} onChange={(e) => setResetToken(e.target.value)} />
          <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      )}
      <div>
        <Link to="/" style={{ cursor: "pointer", color: "blue" }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordReset;
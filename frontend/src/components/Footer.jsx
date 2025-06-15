import React from "react";
import  "../css/footer.css";
export default function Footer() {
  return (
    <div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content py-6!">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Summerlog</p>
        </aside>
      </footer>

    </div>
  );
}

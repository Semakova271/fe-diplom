import React from "react";

const socialLinks = [
  { href: "#youtube", icon: "fa-youtube-play", label: "YouTube" },
  { href: "#linkedin", icon: "fa-linkedin", label: "LinkedIn" },
  { href: "#google", icon: "fa-google-plus", label: "Google Plus" },
  { href: "#facebook", icon: "fa-facebook", label: "Facebook" },
  { href: "#twitter", icon: "fa-twitter", label: "Twitter" },
];

const SocialLinksGroup = () => {
  return (
    <div className="social text-light">
      <h5 className="footer-social__title">Подписывайтесь на нас</h5>
      <div className="footer-social__icons-group">
        {socialLinks.map(({ href, icon, label }) => (
          <a
            key={href}
            className="icon_link"
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fa ${icon} fa-2x`} aria-hidden="true"></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksGroup;
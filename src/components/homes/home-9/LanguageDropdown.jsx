import { useState } from "react";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({ code: "united-kingdom", name: "EN" });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  const languages = [
    { code: "united-kingdom", name: "EN" },
    { code: "saudi-arabia", name: "AR" },
    { code: "netherlands", name: "NL" },
  ];

  return (
    <div className="relative inline-block text-left">
      <a 
        onClick={toggleDropdown} 
        className="flex items-center px-4 py-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 cursor-pointer"
      >
        <i className={`flag-${selectedLanguage.code} flag mr-2`}></i> {selectedLanguage.name}
        <span className="ml-2">▼</span>
      </a>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {languages.map((lang) => (
            <li key={lang.code}>
              <a 
                onClick={() => selectLanguage(lang)} 
                className="block px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer text-dark"
              >
                <i className={`flag-${lang.code} flag mr-2`}></i> {lang.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;

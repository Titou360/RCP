"use client";
import { useState } from "react";
import { register } from "../../services/authService";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    establishment: {
      name: "",
      logo: null,
      floors: 0,
      rooms: 0,
    },
    team: [],
  });

  const countries = [
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+33", name: "France" },
    // Ajoutez plus de pays au besoin
  ];

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("establishment.")) {
      const key = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        establishment: {
          ...prevState.establishment,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    validateForm({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name.startsWith("establishment.")) {
      const key = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        establishment: {
          ...prevState.establishment,
          [key]: files[0],
        },
      }));
    }
    validateForm({ ...formData, [name]: files[0] });
  };

  const validateForm = (data) => {
    const isValidFirstName = data.firstName !== "";
    const isValidLastName = data.lastName !== "";
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email); // Regex for email validation
    const isValidPhoneNumber = validatePhoneNumber(data.phoneNumber);
    const isValid =
      isValidFirstName && isValidLastName && isValidEmail && isValidPhoneNumber;
    setFormValid(isValid);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Example regex to match international phone numbers
    // Modify this regex according to your needs
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phoneRegex.test(phoneNumber);
  };

  const nextStep = () => {
    if (formValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      alert(response.message);
      // Redirection ou autre action après inscription réussie
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        {currentStep === 1 && (
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                S&apos;enregistrer
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Merci de nous indiquer vos coordonnées
              </p>
              <a
                href="#"
                className="text-primary dark:text-primary hover:underline font-medium text-lg inline-flex items-center"
              >
                Un problème ? Besoin d&apos;aide ?
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nom de famille"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre adresse @
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="votre@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre numéro de téléphone :
                    </label>
                    <div className="flex items-center mt-2">
                      <button
                        id="dropdown-phone-button"
                        data-dropdown-toggle="dropdown-phone"
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        type="button"
                      >
                        <svg
                          fill="none"
                          aria-hidden="true"
                          className="h-4 w-4 me-2"
                          viewBox="0 0 20 15"
                        >
                          <rect
                            width="19.6"
                            height="14"
                            y=".5"
                            fill="#fff"
                            rx="2"
                          />
                          <mask
                            id="a"
                            // style="mask-type:luminance"
                            width="20"
                            height="15"
                            x="0"
                            y="0"
                            maskUnits="userSpaceOnUse"
                          >
                            <rect
                              width="19.6"
                              height="14"
                              y=".5"
                              fill="#fff"
                              rx="2"
                            />
                          </mask>
                          <g mask="url(#a)">
                            <path
                              fill="#D02F44"
                              fillRule="evenodd"
                              d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                              clipRule="evenodd"
                            />
                            <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                            <g filter="url(#filter0_d_343_121520)">
                              <path
                                fill="url(#paint0_linear_343_121520)"
                                fillRule="evenodd"
                                d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                clipRule="evenodd"
                              />
                            </g>
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_343_121520"
                              x1=".933"
                              x2=".933"
                              y1="1.433"
                              y2="6.1"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#fff" />
                              <stop offset="1" stopColor="#F0F0F0" />
                            </linearGradient>
                            <filter
                              id="filter0_d_343_121520"
                              width="6.533"
                              height="5.667"
                              x=".933"
                              y="1.433"
                              colorInterpolationFilters="sRGB"
                              filterUnits="userSpaceOnUse"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                result="hardAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              />
                              <feOffset dy="1" />
                              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                              <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_343_121520"
                              />
                              <feBlend
                                in="SourceGraphic"
                                in2="effect1_dropShadow_343_121520"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                        +1{" "}
                        <svg
                          className="w-2.5 h-2.5 ms-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <div
                        id="dropdown-phone"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-phone-button"
                        >
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  fill="none"
                                  aria-hidden="true"
                                  className="h-4 w-4 me-2"
                                  viewBox="0 0 20 15"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                  <mask
                                    id="a"
                                    // style="mask-type:luminance"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.6"
                                      height="14"
                                      y=".5"
                                      fill="#fff"
                                      rx="2"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path
                                      fill="#D02F44"
                                      fillRule="evenodd"
                                      d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fill="#46467F"
                                      d="M0 .5h8.4v6.533H0z"
                                    />
                                    <g filter="url(#filter0_d_343_121520)">
                                      <path
                                        fill="url(#paint0_linear_343_121520)"
                                        fillRule="evenodd"
                                        d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_343_121520"
                                      x1=".933"
                                      x2=".933"
                                      y1="1.433"
                                      y2="6.1"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#fff" />
                                      <stop offset="1" stopColor="#F0F0F0" />
                                    </linearGradient>
                                    <filter
                                      id="filter0_d_343_121520"
                                      width="6.533"
                                      height="5.667"
                                      x=".933"
                                      y="1.433"
                                      colorInterpolationFilters="sRGB"
                                      filterUnits="userSpaceOnUse"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      />
                                      <feOffset dy="1" />
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                      <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_343_121520"
                                      />
                                      <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_343_121520"
                                        result="shape"
                                      />
                                    </filter>
                                  </defs>
                                </svg>
                                United States (+1)
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  className="h-4 w-4 me-2"
                                  fill="none"
                                  viewBox="0 0 20 15"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                  <mask
                                    id="a"
                                    // style="mask-type:luminance"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.6"
                                      height="14"
                                      y=".5"
                                      fill="#fff"
                                      rx="2"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                    <path
                                      fill="#fff"
                                      fillRule="evenodd"
                                      d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      stroke="#DB1F35"
                                      strokeLinecap="round"
                                      strokeWidth=".667"
                                      d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                                    />
                                    <path
                                      fill="#E6273E"
                                      fillRule="evenodd"
                                      d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                      clipRule="evenodd"
                                    />
                                  </g>
                                </svg>
                                United Kingdom (+44)
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  className="h-4 w-4 me-2"
                                  fill="none"
                                  viewBox="0 0 20 15"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                  <mask
                                    id="a"
                                    // style="mask-type:luminance"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.6"
                                      height="14"
                                      y=".5"
                                      fill="#fff"
                                      rx="2"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                    <path
                                      fill="#fff"
                                      stroke="#fff"
                                      strokeWidth=".667"
                                      d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                                    />
                                    <path
                                      fill="url(#paint0_linear_374_135177)"
                                      fillRule="evenodd"
                                      d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fill="url(#paint1_linear_374_135177)"
                                      fillRule="evenodd"
                                      d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fill="#fff"
                                      fillRule="evenodd"
                                      d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                      clipRule="evenodd"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_374_135177"
                                      x1="0"
                                      x2="0"
                                      y1=".5"
                                      y2="7.5"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#fff" />
                                      <stop offset="1" stopColor="#F0F0F0" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_374_135177"
                                      x1="0"
                                      x2="0"
                                      y1=".5"
                                      y2="7.033"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#FF2E3B" />
                                      <stop offset="1" stopColor="#FC0D1B" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                Australia (+61)
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  className="w-4 h-4 me-2"
                                  fill="none"
                                  viewBox="0 0 20 15"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                  <mask
                                    id="a"
                                    // style="mask-type:luminance"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.6"
                                      height="14"
                                      y=".5"
                                      fill="#fff"
                                      rx="2"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path
                                      fill="#262626"
                                      fillRule="evenodd"
                                      d="M0 5.167h19.6V.5H0v4.667z"
                                      clipRule="evenodd"
                                    />
                                    <g filter="url(#filter0_d_374_135180)">
                                      <path
                                        fill="#F01515"
                                        fillRule="evenodd"
                                        d="M0 9.833h19.6V5.167H0v4.666z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                    <g filter="url(#filter1_d_374_135180)">
                                      <path
                                        fill="#FFD521"
                                        fillRule="evenodd"
                                        d="M0 14.5h19.6V9.833H0V14.5z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                  </g>
                                  <defs>
                                    <filter
                                      id="filter0_d_374_135180"
                                      width="19.6"
                                      height="4.667"
                                      x="0"
                                      y="5.167"
                                      colorInterpolationFilters="sRGB"
                                      filterUnits="userSpaceOnUse"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      />
                                      <feOffset />
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                      <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_374_135180"
                                      />
                                      <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_374_135180"
                                        result="shape"
                                      />
                                    </filter>
                                    <filter
                                      id="filter1_d_374_135180"
                                      width="19.6"
                                      height="4.667"
                                      x="0"
                                      y="9.833"
                                      colorInterpolationFilters="sRGB"
                                      filterUnits="userSpaceOnUse"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      />
                                      <feOffset />
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                      <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_374_135180"
                                      />
                                      <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_374_135180"
                                        result="shape"
                                      />
                                    </filter>
                                  </defs>
                                </svg>
                                Germany (+49)
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  className="w-4 h-4 me-2"
                                  fill="none"
                                  viewBox="0 0 20 15"
                                >
                                  <rect
                                    width="19.1"
                                    height="13.5"
                                    x=".25"
                                    y=".75"
                                    fill="#fff"
                                    stroke="#F5F5F5"
                                    strokeWidth=".5"
                                    rx="1.75"
                                  />
                                  <mask
                                    id="a"
                                    // style="mask-type:luminance"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.1"
                                      height="13.5"
                                      x=".25"
                                      y=".75"
                                      fill="#fff"
                                      stroke="#fff"
                                      strokeWidth=".5"
                                      rx="1.75"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path
                                      fill="#F44653"
                                      d="M13.067.5H19.6v14h-6.533z"
                                    />
                                    <path
                                      fill="#1035BB"
                                      fillRule="evenodd"
                                      d="M0 14.5h6.533V.5H0v14z"
                                      clipRule="evenodd"
                                    />
                                  </g>
                                </svg>
                                France (+33)
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  className="w-4 h-4 me-2"
                                  fill="none"
                                  viewBox="0 0 20 15"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                  <mask
                                    id="a"
                                    // style="mask-type:luminance"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.6"
                                      height="14"
                                      y=".5"
                                      fill="#fff"
                                      rx="2"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path
                                      fill="#262626"
                                      fillRule="evenodd"
                                      d="M0 5.167h19.6V.5H0v4.667z"
                                      clipRule="evenodd"
                                    />
                                    <g filter="url(#filter0_d_374_135180)">
                                      <path
                                        fill="#F01515"
                                        fillRule="evenodd"
                                        d="M0 9.833h19.6V5.167H0v4.666z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                    <g filter="url(#filter1_d_374_135180)">
                                      <path
                                        fill="#FFD521"
                                        fillRule="evenodd"
                                        d="M0 14.5h19.6V9.833H0V14.5z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                  </g>
                                  <defs>
                                    <filter
                                      id="filter0_d_374_135180"
                                      width="19.6"
                                      height="4.667"
                                      x="0"
                                      y="5.167"
                                      colorInterpolationFilters="sRGB"
                                      filterUnits="userSpaceOnUse"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      />
                                      <feOffset />
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                      <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_374_135180"
                                      />
                                      <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_374_135180"
                                        result="shape"
                                      />
                                    </filter>
                                    <filter
                                      id="filter1_d_374_135180"
                                      width="19.6"
                                      height="4.667"
                                      x="0"
                                      y="9.833"
                                      colorInterpolationFilters="sRGB"
                                      filterUnits="userSpaceOnUse"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      />
                                      <feOffset />
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                      <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_374_135180"
                                      />
                                      <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_374_135180"
                                        result="shape"
                                      />
                                    </filter>
                                  </defs>
                                </svg>
                                Germany (+49)
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="relative w-full">
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phone-input"
                          aria-describedby="helper-text-explanation"
                          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder="123-456-7890"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!formValid}
                    className={`w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                      !formValid && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={nextStep}
                  >
                    Suivant
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Ajouter des informations sur l&apos;établissement
              </h2>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Renseignez les informations de votre établissement
              </p>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <form className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="establishmentName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nom de l&apos;établissement
                    </label>
                    <input
                      type="text"
                      name="establishment.name"
                      placeholder="Nom de l'établissement"
                      value={formData.establishment.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="establishmentLogo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Logo de l&apos;établissement
                    </label>
                    <input
                      type="file"
                      name="establishment.logo"
                      onChange={handleFileChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="establishmentFloors"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre d&apos;étages
                    </label>
                    <input
                      type="number"
                      name="establishment.floors"
                      placeholder="Nombre d'étages"
                      value={formData.establishment.floors}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="establishmentRooms"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre de chambres
                    </label>
                    <input
                      type="number"
                      name="establishment.rooms"
                      placeholder="Nombre de chambres"
                      value={formData.establishment.rooms}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={prevStep}
                    >
                      Précédent
                    </button>
                    <button
                      type="button"
                      className={`px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                        !formValid && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={nextStep}
                      disabled={!formValid}
                    >
                      Suivant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Ajouter des membres de l&apos;équipe
              </h2>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Veuillez ajouter les membres de votre équipe
              </p>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <form className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="teamMemberFirstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="team[0].firstName"
                      placeholder="Prénom"
                      value={formData.team[0]?.firstName || ""}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="teamMemberLastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nom de famille
                    </label>
                    <input
                      type="text"
                      name="team[0].lastName"
                      placeholder="Nom de famille"
                      value={formData.team[0]?.lastName || ""}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={prevStep}
                    >
                      Précédent
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      S&apos;inscrire
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Register;

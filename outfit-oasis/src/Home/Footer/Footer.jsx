function Footer() {
  return (
    <footer className="bg-black w-screen mt-auto flex flex-col items-center justify-start px-10 py-5 gap-7">
      <ul className="flex min-w-[50%] justify-between">
        <li>
          <a className="text-xl">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a className="text-xl">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a className="text-xl">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </li>
      </ul>
      <p className="font-mono text-[8px] lg:max-w-[30%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </footer>
  );
}

export default Footer;

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import InputField from "../../Login/InputField/InputField";

function AdminItems() {
  /** Send the token to make sure the user is an admin */
  const auth = useAuth();
  const token = auth.token;

  /** Handle error */
  const errorRef = useRef();

  /** Input and handling it */
  const [form, setForm] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: 0,
    itemColors: [],
    itemQuantity: 0,
    itemCategory: "tops",
  });

  const [itemModel, setItemModel] = useState(null);

  /** Handle input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColorsInput = (e) => {
    const { name, value } = e.target;
    const colors = value.split(",").map((color) => color.trim());
    setForm((prevState) => ({
      ...prevState,
      [name]: colors,
    }));
    console.log(form.itemColors);
  };

  const handleFileChange = (e) => {
    setItemModel(e.target.files[0]);
  };

  /** Checking if the user is an admin */
  const checkIfAdmin = () => {
    if (!token) {
      window.location.href = "/login";
    }
    try {
      fetch("http://localhost:8080/api/checkadmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.isAdmin) {
            auth.logout();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


  /** Handle form submission */
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.itemName);
    formData.append("description", form.itemDescription);
    formData.append("price", form.itemPrice);
    formData.append("colors", form.itemColors.join(","));
    formData.append("quantity", form.itemQuantity);
    formData.append("category", form.itemCategory);
    formData.append("modelPath", itemModel);


    try {
        fetch("http://localhost:8080/api/additems", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
                if (data.error) {
                    errorRef.current.textContent = data.error;
                    errorRef.current.style.color = "red";
                    errorRef.current.style.display = "block";
                } else {
                    errorRef.current.textContent = "Item added successfully";
                    errorRef.current.style.display = "block";
                    errorRef.current.style.color = "green";
                }
            });
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    checkIfAdmin();
  }, []);

  return (
    <form
      className=" 
        w-full
        max-w-[1300px]
        mx-auto
        h-full
        flex
        flex-col
        mt-[20%]
        border-x-0
        items-center
        p-6
        mb-11
        lg:mt-28"
    onSubmit={handleSubmit}
    >
      <h1 className="text-3xl m-10 font-sans">Add items</h1>
      <InputField
        label="Item Name"
        name="itemName"
        placeholder="Basic T-shirt"
        type="text"
        onChange={handleInputChange}
        value={form.itemName}
      />
      <InputField
        label="Item Price"
        name="itemPrice"
        placeholder="$73"
        type="number"
        onChange={handleInputChange}
        value={form.itemPrice}
      />
      <div className="flex flex-col w-[100%] max-w-[400px] mb-0 p-2 gap-3 justify-between">
        <label htmlFor="itemDescription" className="font-sans">Item Description</label>
        <textarea
          id="itemDescription"
          name="itemDescription"
          onChange={handleInputChange}
          value={form.itemDescription}
          className="
            bg-transparent
            outline-none
            px-5
            py-1
            border
            text-sm
            font-sans
            rounded-sm
            border-[#8787875b]"
        />
      </div>
      <InputField
        label="Item colors "
        name="itemColors"
        placeholder="add in format: red, yellow, blue, ...etc "
        type="text"
        onChange={handleColorsInput}
        value={form.itemColors.join(", ")}
      />
      <InputField
        label="Item quantity"
        name="itemQuantity"
        placeholder="8"
        type="number"
        onChange={handleInputChange}
        value={form.itemQuantity}
      />
      <div
        className="    
                    flex
                    flex-col
                    w-[100%]
                    max-w-[400px]
                    mb-0
                    p-2
                    gap-3
                    justify-between"
      >
        <label htmlFor="itemCategory" className="font-sans">
          Category:{" "}
        </label>
        <select
          id="itemCategory"
          name="itemCategory"
          onChange={handleInputChange}
          className="
            bg-transparent
            outline-none
            px-5
            py-1
            border
            text-sm
            font-sans
            rounded-sm
            border-[#8787875b]"
        >
          <option value="tops">Tops</option>
          <option value="trousers">Trousers</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
      <div className="flex flex-col w-[100%] max-w-[400px] mb-0 p-2 gap-3 justify-between">
        <label htmlFor="itemModel" className="font-sans">Item Model</label>
        <input
          id="itemModel"
          name="itemModel"
          type="file"
          onChange={handleFileChange}
          className="
            bg-transparent
            outline-none
            px-5
            py-1
            border
            text-sm
            font-sans
            rounded-sm
            border-[#8787875b]"
        />
      </div>
      <button
        type="submit"
        className="
        font-sans
        m-5
        text-2xl
        px-5
        py-1
        rounded-lg
        bg-black
        ring-1
        ring-[#87878741]
        text-[#fff]
        bg-[#xxx]
        shadow-[#807f7f90]
        shadow-sm
        "
      >
        Add item
      </button>
      <p style={{ display: "none" }} ref={errorRef}></p>
    </form>
  );
}

export default AdminItems;

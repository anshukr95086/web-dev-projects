import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const type = useRef();
  const [form, setform] = useState({ site: "", userName: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setpasswordArray(JSON.parse(password));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/Assets/eye-open.svg")) {
      ref.current.src = "/Assets/eye-close.svg";
      type.current.type = "text";
    } else {
      ref.current.src = "/Assets/eye-open.svg";
      type.current.type = "password";
    }
  };

  const handleEdit = (id) => {
    console.log("Editing the password with id: " + id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    let confirmation = confirm("Do you really want to delete this Password ?");
    console.log("Deleting the password with id: " + id);
    if (confirmation) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const savePassword = () => {
    if (
      form.site.length < 3 ||
      form.userName.length < 3 ||
      form.password.length < 3
    ) {
      toast("Error: Password not Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "password",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      setform({ site: "", userName: "", password: "" });
      toast("Password Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("📋Copied to ClipBoard: " + text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

     

      <div className="container mx-auto max-w-3xl mt-20">
        <div className="font-bold text-2xl text-purple-800 mb-1.5">
        Manage Your Passwords
      </div>
        <div className="flex flex-col gap-4">
          <input
            className="h-8.5 rounded-lg border-[1.5px] border-purple-900 focus:border-purple-900 bg-purple-900/10 px-4"
            placeholder="Enter Web address / App Name"
            type="text"
            value={form.site}
            name="site"
            onChange={handleChange}
          />
          <div className="flex gap-5">
            <input
              className="h-7 w-3/4 rounded-lg border-[1.5px] border-purple-900 focus:border-purple-900 bg-purple-900/10 px-4"
              value={form.userName}
              name="userName"
              onChange={handleChange}
              placeholder="Enter User Name"
              type="text"
            />
            <div className="relative flex items-center">
              <input
                ref={type}
                className="h-7 rounded-lg border-[1.5px] border-purple-900 focus:border-pink-600 bg-purple-900/10 px-4"
                placeholder="Password"
                type="password"
                value={form.password}
                name="password"
                onChange={handleChange}
              />
              <span
                className="absolute right-2 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="../Assets/eye-open.svg" alt="" />
              </span>
            </div>
          </div>

          <button
            className="flex items-center border-2 border-purple-700 bg-purple-500 rounded-lg w-fit px-4 py-2 mx-auto gap-2 font-medium"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              colors="primary:#000000"
            ></lord-icon>
            <span>Save Password</span>
          </button>
        </div>

        <h2 className="font-bold mt-10 mb-2 text-2xl">Your Passwords</h2>
        {passwordArray.length === 0 && (
          <div className="text-center text-3xl text-slate-700 opacity-20 mt-20">
            No Passwords to Show
          </div>
        )}

        {passwordArray.length != 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="py-1.5">Web Address/App Name</th>
                <th className="py-1.5">User Name</th>
                <th className="py-1.5">Password</th>
                <th className="py-1.5">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-purple-100">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center py-0.5 flex justify-center items-center w-full gap-2">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                      <span onClick={() => copyText(item.site)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{ width: "22px" }}
                        ></lord-icon>
                      </span>
                    </td>

                    <td className="text-center py-0.5 min-w-16">
                      <div className="flex items-center justify-center gap-2">
                        {item.userName}
                        <span onClick={() => copyText(item.userName)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "22px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>

                    <td className="text-center py-0.5 min-w-16">
                      <div className="flex items-center justify-center gap-2">
                        {item.password}
                        <span onClick={() => copyText(item.password)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "22px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-5 justify-center items-center">
                        <span onClick={() => handleEdit(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "22px" }}
                          ></lord-icon>
                        </span>

                        <span onClick={() => handleDelete(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "22px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;


import { useState, useEffect } from 'react'
function PasswordManager() {
    const [data, setData] = useState({ website: "", name: "", password: "" })
    const [datas, setDatas] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [editedId, setEditedId] = useState(null);
    console.log("fuck")
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/api/passwords/get');
                const result = await response.json();
                if (result.success) {
                    setDatas(result.data);
                    console.log(result.data[0]._id);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        /**const storedData = localStorage.getItem('passwords');
        if (storedData) {
            setDatas(JSON.parse(storedData));
        }**/
    }, [datas]);
    const f1 = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data);
    }
    const f = async () => {
        if (editedId !== null) {
            /**const updatedDatas = datas.map((x) =>
                x.id === editedId ? { ...x, ...data } : x
            );
            setDatas(updatedDatas);

            localStorage.setItem('passwords', JSON.stringify(updatedDatas));
            setData({ website: "", name: "", password: "" });
            setEditedId(null);**/
            await fetch(`http://localhost:5000/api/passwords/update/${editedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setData({ website: "", name: "", password: "" });
            setEditedId(null);
        } else {
           // setDatas([...datas, { ...data, id: Date.now() }])
            await fetch('http://localhost:5000/api/passwords/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
           // localStorage.setItem('passwords', JSON.stringify([...datas, { ...data, id: Date.now() }]))
            setData({ website: "", name: "", password: "" })
        }


    }
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Copied to clipboard: ' + text);
            });
    };
    const deletePassword = (id) => {
        const updatedDatas = datas.filter((x) => x.id !== id);
        setDatas(updatedDatas);
        localStorage.setItem('passwords', JSON.stringify(updatedDatas));
    };
    const updateInfo = (xx) => {
        setData({ website: xx.website, name: xx.name, password: xx.password });
        setEditedId(xx._id);
    }

    return (
        <div className='min-h-[86vh] mb-2'>
            <div className="flex flex-col gap-2 items-center md:w-4/5 md:mx-auto bg-gray-100 px-10 py-2">

                <div className="text-xl font-bold">Password Manager</div>
                <div className="text-gray-600">Your Password Manager</div>
                <input value={data.website} name='website' type='text' placeholder='Enter Website Name' onChange={handleChange} className=" w-full border border-gray-300 rounded-md p-2 bg-white focus:border-blue-500 mt-2 "></input>
                <div className=" w-full flex flex-col md:flex-row gap-2">
                    <input value={data.name} name='name' type='text' placeholder='Enter Your Name' onChange={handleChange} className="border border-gray-300 rounded-md p-2 bg-white focus:border-blue-500 w-full" ></input>
                    <div className="relative w-full">
                        <input value={data.password} name='password' type={showPassword ? 'text' : 'password'} placeholder='Enter Password' onChange={handleChange} className="border border-gray-300 rounded-md p-2 bg-white focus:border-blue-500 w-full"></input>
                        <button onClick={f1}>
                            <span className="material-symbols-outlined absolute right-3 top-2.5 cursor-pointer">
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </button>

                    </div>


                </div>

                <button
                    onClick={f}
                    className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span className="material-symbols-outlined text-2xl text-black">
                        add_box
                    </span>
                    Add
                </button>


            </div>


            <div className="md:w-4/5 md:mx-auto ">
                <h6 className="text-h6 font-semibold text-gray-800 mt-4">Your Passwords</h6>
                {datas.length === 0 ? (
                    <div className='text-center'>No Passwords to display!!</div>
                ) : (
                    <div className="grid grid-cols-4 border border-gray-300 rounded-lg overflow-hidden">

                        <div className="bg-gray-100 font-bold p-2 border-r border-b border-gray-300 text-center">
                            Website
                        </div>
                        <div className="bg-gray-100 font-bold p-2 border-r border-b border-gray-300  text-center">
                            Name
                        </div>
                        <div className="bg-gray-100 font-bold p-2 border-r border-b border-gray-300 text-center">
                            Password
                        </div>
                        <div className="bg-gray-100 font-bold p-2 border-b border-gray-300 text-center">
                            Actions
                        </div>


                        {datas.map((x, index) => (
                            <div key={index} className="contents">
                                <div className="  p-2 border-r border-b border-gray-300 break-words">
                                    {x.website} <button className="material-symbols-outlined inline-block align-middle text-lg text-blue-500 cursor-pointer ml-1  " onClick={() => copyToClipboard(x.website)}>
                                        content_copy
                                    </button>
                                </div>
                                <div className="p-2 border-r border-b border-gray-300 break-words">
                                    {x.name} <button className="material-symbols-outlined inline-block align-middle text-lg text-blue-500 cursor-pointer ml-1 " onClick={() => copyToClipboard(x.name)}>
                                        content_copy
                                    </button>
                                </div>
                                <div className="p-2 border-r border-b border-gray-300 break-words">
                                    {x.password} <button className="material-symbols-outlined  inline-block align-middle text-lg text-blue-500 cursor-pointer ml-1 hover:text-blue-700 " onClick={() => copyToClipboard(x.password)}>
                                        content_copy
                                    </button>
                                </div>
                                <div className="p-2  border-r border-b border-gray-300">
                                    <button className="bg-red-500 text-white p-1 rounded" onClick={() => deletePassword(x.id)}>
                                        Delete
                                    </button>
                                    <button className="bg-green-500 text-white p-1 rounded ml-2 " onClick={() => updateInfo(x)}>

                                        Update Data
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>)

}

export default PasswordManager
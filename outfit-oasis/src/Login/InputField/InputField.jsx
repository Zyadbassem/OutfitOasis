

function InputField({label="username", name="username", placeholder="johnCena", type="text", onChange, value=""}) {

    const handleChange = (e) => {
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div
        className="    
                    flex
                    flex-col
                    w-[100%]
                    max-w-[400px]
                    mb-0
                    p-2
                    gap-3
                    justify-between">
            <label htmlFor={name} className="font-sans">{label}: </label>
            <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange}className="
            bg-transparent
            outline-none
            px-5
            py-1
            border
            text-sm
            font-sans
            rounded-sm
            border-[#8787875b]"/>
        </div>
    )
}

export default InputField
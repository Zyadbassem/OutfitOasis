function OrderItem({ orderId = 0, total_amount = 0, date = "0/0/0" }) {
  const dateString = date;
  const dateToFormat = new Date(dateString);

  const yy = String(dateToFormat.getFullYear()); // Get last two digits of year
  const mm = String(dateToFormat.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const dd = String(dateToFormat.getDate()).padStart(2, "0");

  const formattedDate = `${yy}/${mm}/${dd}`;
  console.log(formattedDate); // Output: "25/02/14"

  return (
    <div
      className="
        flex
        min-w-[100%]
        items-start
        justify-between
        border-b
        border-[#878787]
        font-mono
        my-5
        py-5
      "
    >
      <div className="flex flex-col items-center justify-start m-2 flex-1 gap-2">
        <span className="font-mono text-xs lg:text-sm"> Order Id </span>
        <span className="font-mono text-[10px] text-[#878787] lg:text-xs">
          {orderId}
        </span>
      </div>
      <div className="flex flex-col items-center justify-start m-2 flex-1 gap-2">
        <span className="font-mono text-xs lg:text-sm"> total price </span>
        <span className="font-mono text-[10px] text-[#fff] lg:text-xs font-bold">
          ${total_amount}
        </span>
      </div>
      <div className="flex flex-col items-center justify-start m-2 flex-1 gap-2">
        <span className="font-mono text-xs lg:text-sm">date</span>
        <span className="font-mono text-[10px] text-[#878787] lg:text-xs">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

export default OrderItem;

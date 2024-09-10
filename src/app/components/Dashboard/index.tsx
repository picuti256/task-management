import Modal from "../Modal";

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-900 text-white  flex flex-col gap-2 flex-1 w-full h-full">
        <Modal />
      </div>
    </div>
  );
};

export default Dashboard;

import MultiSelect from "./components/MultiSelect/MultiSelect";

export default function Home() {

  const users = [
    "Pankaj",
    "Govind",
    "Rahul",
    "Neeraj",
    "Vaibhav",
    "Hemant",
    "Ranbir",
  ];

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="">
          <h1 className="text-3xl font-semibold">Select Users</h1>
        </div>
      </div>

      <div className="flex justify-center py-10 px-3 mx-auto">
        <MultiSelect items={users} />
      </div>
    </>
  )
}

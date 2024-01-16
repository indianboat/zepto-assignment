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
      <div className="flex justify-center pt-10 pb-6 border">
        <div className="border">
          <h1 className="text-3xl font-semibold">Select Users</h1>
        </div>
      </div>

      <div className="flex justify-center mt-4 border">
        <MultiSelect items={users} />
      </div>
    </>
  )
}

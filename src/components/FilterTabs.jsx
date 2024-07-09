export const FilterTabs = (props) => {
  const { activeTab, setActiveTab } = props;
  const tabList = ['All', '1970s', '1980s', '1990s', '2000s', '2010s', '2020 - 24'];

  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap justify-center mb-16">
        {
          tabList.map((tab) => {
            return (
              <li
                key={tab}
                className={`${activeTab === tab && 'bg-white text-black'} px-4 py-2 cursor-pointer`}
                onClick={() => setActiveTab(tab)}>
                  {tab}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

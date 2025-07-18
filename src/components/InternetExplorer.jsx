import { act, useEffect, useState } from "react";
import { Window } from "./Window";
import { getAppById, getFileById } from "../getters";

export function InternetExplorer({ runningApp }) {
  const [appData, setAppData] = useState({ app: {}, data: {} });
  const [tabs, setTabs] = useState([
    {
      id: "tab-001",
      name: "Google Chrome Fast & Secure Browser Built to Be Yours",
      url: "https://google.com/chrome",
      tabicon: "/iconchrome.png" || "/iexplorer.png",
    },
    {
      id: "tab-002",
      name: "Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Cat",
      tabicon: "/iconwikipedia.png" || "/iexplorer.png",
    },
  ]);
  const [activeTab, setActiveTab] = useState("tab-001");

  useEffect(() => {
    setAppData({
      app: getAppById(runningApp.app),
      data: {
        name: tabs.find((tab) => tab.id === activeTab).name,
        icon: tabs.find((tab) => tab.id === activeTab).tabicon,
      },
    });

    console.log(runningApp);
  }, [runningApp, activeTab]);

  return (
    <Window
      appData={appData}
      header={
        <nav className="ie-nav">
          <section className="ie-arrows">
            <button className="ie-arrow-back"></button>
            <button className="ie-arrow-forward"></button>
          </section>
          <section className="ie-searchbar">
            <input
              type="search"
              value={tabs.find((tab) => tab.id === activeTab).url}
              placeholder="Search"
            />
            <button type="button" className="ie-refresh" />
            <button type="button" className="ie-stop-loading" />
          </section>
          <section className="ie-search-engines">
            <img src="/iconbing.png" alt="bing" />
            <span>Bing</span>
          </section>
        </nav>
      }
    >
      <div className="internet-explorer">
        <header className="ie-bkmrks-tabs">
          <section className="ie-bookmarks">
            <div className="ie-bookmarks-favourites">
              <img src="/ie-bkm-favorites.svg" alt="Favorites" />
              <span>Favorites</span>
            </div>
          </section>
          <section className="ie-tabs">
            {Array.from(tabs).map((tab, key) => {
              return (
                <IETab
                  active={activeTab === tab.id}
                  tabData={tab}
                  key={key}
                  onClick={() => setActiveTab(tab.id)}
                />
              );
            })}
          </section>
        </header>
        <section className="ie-tab-content">
          <iframe src={tabs.find((tab) => tab.id === activeTab).url} />
        </section>
      </div>
    </Window>
  );
}

function IETab({ tabData, active, onClick }) {
  return (
    <div className={`ie-tab ${active ? "active" : ""}`} onClick={onClick}>
      <img src={tabData.tabicon} alt={tabData.name} />
      <span>{tabData.name}</span>
    </div>
  );
}

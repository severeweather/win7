import { useEffect, useState } from "react";
import { Window } from "./Window";
import { getAppById, getFileById } from "../getters";

export function InternetExplorer({ runningApp }) {
  const [appData, setAppData] = useState({ app: {}, data: {} });
  const [tabs, setTabs] = useState([
    { id: "tab-001", name: "Google Search", url: "https://google.com/chrome" },
    { id: "tab-002", name: "Wikipedia", url: "https://wikipedia.com" },
  ]);
  const [activeTab, setActiveTab] = useState("tab-001");

  useEffect(() => {
    setAppData({
      app: getAppById(runningApp.app),
      data: getFileById(runningApp.data),
    });

    console.log(runningApp);
  }, [runningApp]);

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
            <input type="search" />
            <button type="button" className="ie-refresh" />
            <button type="button" className="ie-stop-loading" />
          </section>
          <select className="ie-search-engines">
            <option>Google</option>
            <option>Bing</option>
            <option>Yahoo</option>
          </select>
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
                <IETab active={activeTab === tab.id} tabData={tab} key={key} />
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

function IETab({ tabData, active }) {
  return (
    <div className={`ie-tab ${active ? "active" : ""}`}>
      <span>{tabData.name}</span>
    </div>
  );
}

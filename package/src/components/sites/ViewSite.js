import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewSite() {
  const [site, setSite] = useState({
    siteId: "",
    name: "",
    isPrivate: false,
    robotId: "",
    proxy: "",
    scenarioNb: 0,
    queueNb: 0,
    hasSiteManagerIssue: false,
    zoneNb: 0,
    clients: [],
  });

  const { id } = useParams();

  useEffect(() => {
    loadSite();
  }, []);

  const loadSite = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/callsite/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
      const siteData = response.data;
      setSite({
        siteId: siteData.siteId,
        name: siteData.name,
        isPrivate: siteData.isPrivate,
        robotId: siteData.robotId,
        proxy: siteData.proxy,
        scenarioNb: siteData.scenarioNb,
        queueNb: siteData.queueNb,
        hasSiteManagerIssue: siteData.hasSiteManagerIssue,
        zoneNb: siteData.zoneNb,
        clients: siteData.clients
      });
    } catch (error) {
      console.error("Error loading site:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Site Details</h2>

          <div className="card">
            <div className="card-header">
              Details of site id : {site.siteId}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {site.name}
                </li>
                <li className="list-group-item">
                  <b>Privacy:</b> {site.isPrivate ? "Private" : "Public"}
                </li>
                <li className="list-group-item">
                  <b>RobotId:</b> {site.robotId}
                </li>
                <li className="list-group-item">
                  <b>Proxy:</b> {site.proxy || "None"}
                </li>
                <li className="list-group-item">
                  <b>Scenario count:</b> {site.scenarioNb}
                </li>
                <li className="list-group-item">
                  <b>Queue count:</b> {site.queueNb}
                </li>
                <li className="list-group-item">
                  <b>Site manager issue:</b> {site.hasSiteManagerIssue ? "Yes" : "No"}
                </li>
                <li className="list-group-item">
                  <b>Zone count:</b> {site.zoneNb}
                </li>
                <li className="list-group-item">
                  <b>Clients:</b> {site.clients.join(", ")}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

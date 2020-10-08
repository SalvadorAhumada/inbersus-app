import React, { useEffect, useState } from "react";
import "./style/styles.css";
import XLSX from "xlsx";
import { Animated } from "react-animated-css";

export default function Table(props) {
  const formatNumber = (number) => {
    const options = { style: "currency", currency: "USD" };
    const numberFormat = new Intl.NumberFormat("en-US", options);
    return numberFormat.format(number);
  };

  const [currentYear, setCurrentYear] = useState(1);

  const [animation, setAnimation] = useState(true);

  const [download, setDownload] = useState(false);

  const changePage = (type) => {
    if (type === -1 && currentYear === 1) return;
    if (type === 1 && currentYear === props.results.length / 12) return;
    setCurrentYear(currentYear + type);
  };

  const tablePagination = () => {
    let year = currentYear * 12;
    let start = year - 12;
    let end = year;
    let currentPage = props.results.slice(start, end);

    // Hacemos otra simulación, reinicia tabla.
    if (currentPage.length === 0) {
      currentPage = props.results.slice(0, 12);
      setCurrentYear(1);
    }
    return currentPage;
  };

  useEffect(() => {
    setTimeout(() => {
      props.loadingState();
    }, 0);
  });

  const downloadTable = () => {
    setDownload(true);
    setTimeout(() => {
      document.body.style.cursor = "wait";
      var downloadTime = new Date();
      var day = downloadTime.getDate();
      var month = downloadTime.getMonth() + 1;
      var year = downloadTime.getFullYear();
      var dom = document.getElementById("download_xlsx");
      const wb = XLSX.utils.table_to_book(dom, { sheet: "inbersus" });
      document.body.style.cursor = "auto";
      setDownload(false);
      return XLSX.writeFile(wb, `inbersus_${day}_${month}_${year}.xlsx`);
    }, 0);
  };

  const isVisible = () => {
    return animation;
  };

  const redoInvestment = () => {
    setAnimation(false);
    setTimeout(() => {
      props.redo();
    }, 1000);
  };

  const download_xslx = download ? (
    <table id="download_xlsx">
      <tbody>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Cantidad ahorrada</th>
            <th>Inversión Total</th>
            <th>Retorno</th>
          </tr>
        </thead>
        {props.results.map((month, index) => (
          <tr key={index}>
            <th>{month.monthNo}</th>
            <th>{formatNumber(month.month.savings)}</th>
            <th>{formatNumber(month.month.investment)}</th>
            <th>
              {formatNumber(month.month.investment - month.month.savings)}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    " "
  );

  return (
    <div className="table-wrapper">
      <table id="download-table">
        <thead id="inline-table">
          <tr className="head">
            <th>Mes</th>
            <th>Cantidad ahorrada</th>
            <th>Inversion Total</th>
            <th>Retorno</th>
          </tr>
        </thead>
        <tbody className="body">
          {tablePagination().map((month, index) => (
            <tr key={index}>
              <th>{month.monthNo}</th>
              <th>{formatNumber(month.month.savings)}</th>
              <th>{formatNumber(month.month.investment)}</th>
              <th>
                {formatNumber(month.month.investment - month.month.savings)}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="controllers">
        <button onClick={() => changePage(-1)}>
          <i className="material-icons">chevron_left</i>
        </button>{" "}
        <span>Año {currentYear}</span>
        <button onClick={() => changePage(1)}>
          <i className="material-icons">chevron_right</i>
        </button>{" "}
      </div>
      {download_xslx}
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isVisible()}
      >
        <div className="download">
          <button onClick={redoInvestment}>
            Crear otra simulación <i className="material-icons">cached</i>
          </button>
          <button onClick={downloadTable}>
            Descargar XLSX <i className="material-icons">file_download</i>
          </button>
        </div>
      </Animated>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Modal = ({ closeChatModal, spid }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">주의하세요.</div>
        <div className="modal-body">급발진이 의심됩니다. (spid: {spid})</div>
        <button className="close-button" onClick={closeChatModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

const Navi = () => {
  const [visible, setVisible] = useState(false);
  const [spid, setSpid] = useState(100);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://port-0-speed-data-9zxht12blq9gr7pi.sel4.cloudtype.app/SpeedDataRouter",
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error making the request:", error);
      }
    };

    fetchData();
  }, []);

  const showChatModal = () => {
    setSpid(190);
    setVisible(true);
  };

  const closeChatModal = () => {
    setVisible(false);
  };

  return (
    <div id="layout">
      <p id="spid">{spid}</p>
      <button id="id" onClick={showChatModal}>
        급발진 의심 테스트
      </button>
      {visible && <Modal closeChatModal={closeChatModal} spid={spid} />}
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default Navi;

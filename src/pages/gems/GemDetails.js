import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import EditCard from "../../components/EditCard";
import BasicModal from "../../components/BasicModal";
import { useTranslation } from "react-i18next";
import GemsData from "../../model/GemsData";

export default function GemDetails() {
  const { id } = useParams();
  const gem = GemsData[id];
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [editGem, setEditGem] = useState(true);
  const [title, setTitle] = useState(gem.title);
  const [origin, setOrigin] = useState(gem.origin);
  const [reserved, setReserved] = useState(gem.reserved);
  const originEditButton = editGem ? t("edit") : t("back");

  const gemPom = { title, origin, reserved };

  // MODAL VARIABLES
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTypeDanger, setModalTypeDanger] = useState(false);

  const deleteGem = (id) => {
    if (GemsData.length < 7) {
      setModalTypeDanger(true);
      setModalText(t("minimalCountReached"));
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setModalTypeDanger(false);
      }, 3000);
    } else {
      setModalText(t("recordDeleted"));
      setOpen(true);
      setTimeout(() => {
        navigate("../../gems");
        GemsData.splice(id, 1);
      }, 1500);
    }
  };

  const changeGem = (id) => {
    GemsData[id].title = title;
    GemsData[id].origin = origin;
    GemsData[id].reserved = reserved;

    setModalText(t("recordChanged"));
    setOpen(true);
    setTimeout(() => {
      navigate("../../gems");
    }, 1500);
  };

  const handleEditClick = () => {
    setTitle(gem.title);
    setOrigin(gem.origin);
    setReserved(gem.reserved);
    setEditGem((prev) => !prev);
  };

  return (
    <div>
      <div>
        {editGem && (
          <button className="gemBtn" onClick={() => navigate("../../gems")}>
            {t("back")}
          </button>
        )}
        <button className="gemBtn" onClick={handleEditClick}>
          {originEditButton}
        </button>
        {editGem && (
          <button className="gemBtn" onClick={() => deleteGem(id)}>
            {t("delete")}
          </button>
        )}
      </div>
      {editGem ? (
        <div className="gem-details">
          <EditCard gem={gem} key={GemsData[id]} width="400px" height="400px" />
        </div>
      ) : (
        <div className="createDiv">
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <EditCard
              gem={gemPom}
              key={GemsData[id]}
              width="400px"
              height="400px"
            />
          </div>
          <TextField
            value={title}
            id="titleCreate"
            label={t("title")}
            variant="outlined"
            fullWidth
            style={{ margin: "5px 0px" }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            value={origin}
            id="titleOrigin"
            label={t("origin")}
            variant="outlined"
            fullWidth
            style={{ margin: "5px 0px" }}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={reserved}
                onChange={(e) => setReserved(e.target.checked)}
              />
            }
            label={t("reserved")}
          />
          <Button
            variant="contained"
            style={{ display: "block", margin: "5px auto" }}
            onClick={() => changeGem(id)}
          >
            {t("change")}
          </Button>
        </div>
      )}
      <BasicModal
        text={modalText}
        modalTypeDanger={modalTypeDanger}
        open={open}
      />
    </div>
  );
}

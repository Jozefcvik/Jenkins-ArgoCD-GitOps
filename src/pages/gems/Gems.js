import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import AllCards from "../../components/AllCards";
import BasicModal from "../../components/BasicModal";
import { useTranslation } from "react-i18next";
import GemsData from "../../model/GemsData";

export default function Gems() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [createGem, setCreateGem] = useState(false);
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [reserved, setReserved] = useState(false);
  const buttonOrigin = createGem ? t("back") : t("create");

  // MODAL VARIABLES
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTypeDanger, setModalTypeDanger] = useState(false);

  const warningMessage = () => {
    setModalTypeDanger(true);
    setModalText(t("maximalCountReached"));
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setModalTypeDanger(false);
    }, 3000);
    setCreateGem((prev) => !prev);
  };

  useEffect(() => {
    if (createGem && GemsData.length >= 10) {
      warningMessage();
    }
  }, [createGem]);

  const createGemFunc = (title, origin, reserved) => {
    GemsData.push({ title, origin, reserved });
    setModalText(t("recordCreated"));
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
    setCreateGem((prev) => !prev);
    navigate("../../gems");
  };

  return (
    <div>
      <ul className="gems" style={{ padding: "0px" }}>
        <button
          className="Create"
          onClick={() => setCreateGem((prev) => !prev)}
        >
          {buttonOrigin}
        </button>
        <div>
          {/* {createGem && GemsData.length < 11 && ( */}
          {createGem && GemsData.length < 11 && (
            <div className="createDiv">
              <TextField
                id="titleCreate"
                label={t("title")}
                variant="outlined"
                fullWidth
                style={{ margin: "5px 0px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="titleOrigin"
                label={t("origin")}
                variant="outlined"
                fullWidth
                style={{ margin: "5px 0px" }}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => setReserved(e.target.checked)} />
                }
                label={t("reserved")}
              />
              <Button
                variant="contained"
                style={{ display: "block", margin: "5px auto" }}
                onClick={() => createGemFunc(title, origin, reserved)}
              >
                {t("create")}
              </Button>
            </div>
          )}
        </div>

        <div className="gemsGrid">
          {GemsData.map((gem) => (
            <Link to={GemsData.indexOf(gem).toString()}>
              <AllCards gem={gem} key={GemsData.indexOf(gem)} />
            </Link>
          ))}
        </div>
      </ul>
      <BasicModal
        text={modalText}
        modalTypeDanger={modalTypeDanger}
        open={open}
      />
    </div>
  );
}

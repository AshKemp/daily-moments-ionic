import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { firestore, storage } from "../firebase";
import { useAuth } from "../auth";
import { useHistory } from "react-router";
import { addDoc, collection } from "@firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "@firebase/storage";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

async function savePicture(blobUrl, userId) {
  const pictureRef = storageRef(
    storage,
    `users/${userId}/pictures/${Date.now()}`
  );
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await uploadBytes(pictureRef, blob);
  const url = getDownloadURL(snapshot.ref);
  console.log("saved url: ", url);
  return url;
}

const AddEntryPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [pictureUrl, setPictureUrl] = useState("assets/placeholder.png");
  const fileInputRef = useRef<HTMLInputElement>();

  const { userId } = useAuth();
  const history = useHistory();

  const handleSave = async () => {
    const entriesRef = collection(firestore, "users", userId, "entries");
    const entryData = { title, description, date, pictureUrl };
    if (!pictureUrl.startsWith("/assets")) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await addDoc(entriesRef, entryData);
    console.log("Saved: ", entryRef.id);
    history.goBack();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      console.log("created URL: ", pictureUrl);
      setPictureUrl(pictureUrl);
    }
  };

  const handlePictureClick = async () => {
    if (isPlatform("capacitor")) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          width: 600,
          source: CameraSource.Prompt,
        });
        console.log("photo: ", photo);
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.log(error);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  useEffect(
    () => () => {
      if (pictureUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonInput
              type="date"
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
            <img
              src={pictureUrl}
              style={{ cursor: "pointer" }}
              alt=""
              onClick={handlePictureClick}
            ></img>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            ></IonTextarea>
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;

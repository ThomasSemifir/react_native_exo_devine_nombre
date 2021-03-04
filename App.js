import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from "react-native";

export const App = (props) => {
  const [nombreTente, setNombreTente] = useState('');
  const [message, setMessage] = useState();
  const [nombreAleatoire, setNombreAleatoire] = useState((Math.floor(Math.random() * 100) + 1));
  const [compteur, setCompteur] = useState(0);
  const [victoire, setVictoire] = useState(false)

  const jeuGagne = () => {
    setMessage(`Vous avez trouvé le nombre "${nombreTente}" en ${compteur} coups!`)
    setVictoire(!victoire)
    Keyboard.dismiss()
  }

  const rejouer = () => {
    setNombreAleatoire((Math.floor(Math.random() * 100) + 1))
    setVictoire(!victoire)
    setNombreTente('')
    setCompteur(0)
    setMessage()
  }

  const handlePress = (tentative) => {
    (parseInt(tentative) < nombreAleatoire) ? (
      setCompteur(compteur + 1),
      setMessage(`Votre tentative ${nombreTente} est trop basse! Réessayez ${nombreAleatoire}`))
      : (parseInt(tentative) > nombreAleatoire) ? (
        setCompteur(compteur + 1),
        setMessage(`Votre tentative ${nombreTente} est trop haute! Réessayez ${nombreAleatoire}`))
        : (parseInt(tentative) === nombreAleatoire) ? jeuGagne()
          : setMessage(
            setCompteur(compteur + 1),
            (`${nombreTente} n'est pas un nombre!`));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { victoire ? rejouer() : handlePress(nombreTente) }}
        style={styles.button}
      >
        <Text style={styles.verifier}>{victoire ? "Rejouer" : "Vérifier"}</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Entrez votre choix entre 0 et 100"
        style={styles.choix}
        onChangeText={(val) => { setNombreTente(val) }}
        keyboardType='numeric'
      ></TextInput>
      {message && <Text style={styles.resultat}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "rgba(15,17,44,1)"
  },
  button: {
    alignItems: 'center',
    width: 190,
    height: 104,
    backgroundColor: "rgba(78,84,176,1)",
    borderWidth: 5,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 69,
    marginTop: 300,
  },
  verifier: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 42,
    width: 109,
    fontSize: 30,
    marginTop: 31,
  },
  choix: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 158,
    width: 165,
    backgroundColor: "rgba(80,227,194,1)",
    fontSize: 15,
    textAlign: "center",
    marginTop: -377,
  },
  resultat: {
    fontFamily: "roboto-regular",
    backgroundColor: 'yellow',
    color: "#121212",
    height: 129,
    width: 165,
    marginTop: 284,
  }
});



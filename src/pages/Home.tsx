import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface ISkillData {
  id: string;
  name: string;
}

export default function Home() {
  // 1° param: variável read-only
  // 2° param: seta a primeira variável
  // pode setar o estado inicial utilizando useState(QLQR COISA)
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState<ISkillData[]>([]);
  const [greetings, setGreetings] = useState("");

  // usar sempre o 'handle' para indicar qnd vc vai lidar com uma ação executada pelo usuário
  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    // fazendo o spread operator (recupera valores anteriores e adiciona o novo)
    setMySkills((oldState) => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => {
      return oldState.filter((skill) => skill.id !== id);
    });
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings("Good afternoon");
    } else {
      setGreetings("Good night");
    }
  }, []);

  // Localiza os elementos visuais
  return (
    <>
      {/* SafeAreaView => '<View>' para ajustar tela de ios (sem efeito em android) */}
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome, Gabriel</Text>
        <Text style={styles.greetings}>{greetings}</Text>
        <TextInput
          // {setNewSkill} indicando mudança no 'newSkill'
          onChangeText={setNewSkill}
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
        />
        <Button onPress={handleAddNewSkill} title={"Add"} />
        {/* marginVertical => coloca margin em cima e embaixo  */}
        <Text style={[styles.title, { marginVertical: 50 }]}>My skills</Text>
        <FlatList
          data={mySkills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SkillCard
              skill={item.name}
              // Utilizar '() =>' quando a função precisa de um parâmetro
              onPress={() => handleRemoveSkill(item.id)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

// Localiza a parte de estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1f1e25",
    color: "#fff",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: "#fff",
  },
});

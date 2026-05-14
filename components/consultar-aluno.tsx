import { supabase } from "@/lib/supabase";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import Toast from "react-native-toast-message";

export default function ConsultarAluno(){
    const [alunos, setAlunos] = useState<any[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            carregarAlunos();
        }
    }, [isFocused]);

    async function carregarAlunos(){
        const { data, error } = await supabase
            .from("tb_aluno")
            .select("*")
        
        setAlunos(data || []);
    }

    async function editarAlunos(id: number){
        router.push({pathname: '/(tabs)/alterar', params: {id: id}});
    }

    async function excluirAlunos(id: number){

        const { error } = await supabase
            .from("tb_aluno")
            .delete()
            .eq('id', id)

        if(error ){
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Não foi possível excluir o aluno.'+ error.message
            })
        }else{
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Aluno excluído com sucesso!'
            })
        }
        carregarAlunos();
    }

    return(
        <View style={styles.container}>
            <Text>Consultar Aluno</Text>
            <FlatList
                data={ alunos }
                keyExtractor={ (item) => item.id.toString() }
                renderItem={({item}) =>(
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.idade}</Text>
                        <Text>{item.email}</Text>
                        <TouchableOpacity onPress={() => editarAlunos(item.id)}>
                            <Text>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => excluirAlunos(item.id)}>  
                            <Text>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Toast />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        color: "#000",
    }
});
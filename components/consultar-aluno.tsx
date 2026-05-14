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

        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: `Não foi possível carregar os alunos. ${error.message}`
            });
            return;
        }

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
            <Text style={styles.title}>Consultar Aluno</Text>
            <FlatList
                data={ alunos }
                contentContainerStyle={styles.listContent}
                keyExtractor={ (item) => item.id.toString() }
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aluno cadastrado.</Text>}
                renderItem={({item}) =>(
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.nome}</Text>
                        <Text style={styles.meta}>Idade: {item.idade}</Text>
                        <Text style={styles.meta}>Email: {item.email}</Text>
                        <View style={styles.actions}>
                        <TouchableOpacity style={styles.buttonAlterar} onPress={() => editarAlunos(item.id)}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonExcluir, styles.buttonSpacing]} onPress={() => excluirAlunos(item.id)}>  
                            <Text style={styles.buttonText}>Excluir</Text>
                        </TouchableOpacity>
                        </View>
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
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    meta: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 4,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 16,
        marginTop: 32,
    },
    buttonAlterar:{
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    buttonExcluir:{
        backgroundColor: '#ef4444',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    actions: {
        marginTop: 16,
        flexDirection: 'row',
    },
    buttonSpacing: {
        marginLeft: 12,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
})

import { supabase } from "@/lib/supabase";
import { useFocusRefresh } from "@/hooks/use-focus-refresh";
import { useCallback, useState } from "react";

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import Toast from "react-native-toast-message";

export default function ConsultarAluno(){
    const [alunos, setAlunos] = useState<any[]>([]);

    const carregarAlunos = useCallback(async () => {
        const { data, error } = await supabase
            .from("tb_aluno")
            .select("*")
        
        setAlunos(data || []);
    }, []);

    useFocusRefresh(carregarAlunos);

    async function editarAlunos(id: number){
        router.push({pathname: '/(tabs)/alterar', params: {id: id}});
    }

    async function excluirAlunos(id: number){

        const { error } = await supabase
            .from("tb_aluno")
            .delete()
            .eq('id', id)
            .select()

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

    function renderLeftActions(item: any) {
        return (
            <View style={styles.leftActions}>
                <TouchableOpacity
                    style={[styles.swipeButton, styles.buttonEditar]}
                    onPress={() => editarAlunos(item.id)}
                >
                    <Ionicons name="create-outline" size={16} color="#ffffff" />
                    <Text style={styles.swipeButtonText}>Editar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderRightActions(item: any) {
        return (
            <View style={styles.rightActions}>

                <TouchableOpacity
                    style={[styles.swipeButton, styles.buttonExcluir]}
                    onPress={() => excluirAlunos(item.id)}
                >
                    <Ionicons name="trash-outline" size={16} color="#ffffff" />
                    <Text style={styles.swipeButtonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text style={styles.listTitle}>
                <Ionicons name="search" size={18} color="#111827" /> Consultar Aluno
            </Text>
            <FlatList
                data={ alunos }
                contentContainerStyle={styles.listContent}
                keyExtractor={ (item) => item.id.toString() }
                renderItem={({item}) =>(
                    <Swipeable
                        renderLeftActions={() => renderLeftActions(item)}
                        renderRightActions={() => renderRightActions(item)}
                        overshootLeft={false}
                        overshootRight={false}
                    >
                        <View style={styles.card}>
                            <Text style={styles.name}>{item.nome}</Text>
                            <Text style={styles.meta}>{`${item.idade} anos  |  ${item.email}`}</Text>
                        </View>
                    </Swipeable>
                )}
            />
            <Toast />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
    },
    listContent: {
        flexGrow: 1,
        paddingTop: 12,
        paddingBottom: 24,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginTop: 12,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        minHeight: 72,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#d1d5db',
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 4,
    },
    meta: {
        fontSize: 13,
        color: '#6b7280',
    },
    emptyText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 16,
        marginTop: 32,
    },
    leftActions: {
        justifyContent: "center",
    },
    rightActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    swipeButton: {
        width: 92,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    swipeButtonText: {
        color: "#ffffff",
        fontWeight: "700",
    },
    buttonEditar:{
        backgroundColor: '#16a34a',
    },
    buttonExcluir:{
        backgroundColor: '#dc2626',
    },
})
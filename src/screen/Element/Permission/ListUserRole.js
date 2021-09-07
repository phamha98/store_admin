import React, {useState, useEffect, useContext, useRef} from 'react'
import {FlatList, Alert} from 'react-native'
import {apiListUserRole, apiDeleteRoleUser} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  ItemUserPermission,
  ToastAndroidLong,
} from '@component'
import {navigate} from '@navigation'
import ModalSearch from './component/ModalSearch'
export default function index ({route}) {
  const {idRole, displayName} = route.params
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false)
  const refModal = useRef()
  useEffect(() => {
    apiListUserRole(token, idRole).then(result => {
      setData(result.data)
    })
  }, [load])

  const handleDeleteRoleUser = idUser => {
    apiDeleteRoleUser(token, idRole, idUser)
      .then(re => {
        ToastAndroidLong('Đã xóa')
      })
      .catch(e => console.log(e))
      .finally(() => setLoad(!load))
  }
  const handleRemove = idUser => {
    if (idUser === 1) return ToastAndroidLong('Không thể xóa root')
    return Alert.alert('Cảnh báo', 'Bạn có chắc chắn muốn xóa', [
      {
        text: 'Hủy',
      },
      {
        text: 'Xóa',
        onPress: () => handleDeleteRoleUser(idUser),
      },
    ])
  }
  const handleCloseModal = () => {
    refModal.current.close()
    setLoad(!load)
  }
  return (
    <Layout>
      <HeaderC
        title={displayName ? displayName : 'Danh sách'}
        rightNameIcon='person-add-outline'
        onClickRight={() => refModal.current.open()}
      />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ItemUserPermission
            item={item}
            onPress={() => navigate('ShowUser', {data: item})}
            onRemove={() => handleRemove(item.id)}
          />
        )}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
      <ModalSearch
        ref={refModal}
        listCurrent={data}
        idRole={idRole}
        onClose={handleCloseModal}
      />
    </Layout>
  )
}

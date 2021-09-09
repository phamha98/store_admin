import React, {useState, useEffect, PureComponent} from 'react'
import {
  AppContext,
  HeaderC,
  Layout,
  screen_width,
  TabCustom,
  ViewCore,
  formatVND,
  screen_height,
  Light,
  ButtonBasic,
} from '@component'
import {navigate} from '@navigation'
import {apiStaticGetProduct} from '@api'
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component'
import styles from './styles'
import {ScrollView, ActivityIndicator} from 'react-native'
import {isEmpty} from 'underscore'
import StaticDetailProduct from './component/StaticDetailProduct'
import {formatDataProduct, formatDataProduct2} from './utils'
export default function StatisticProduct () {
  const [data, setData] = useState(null)
  const [filter, setFIlter] = useState(false)
  useEffect(() => {
    apiStaticGetProduct()
      .then(r => {
       
        if (r.code === 200) {
          if (r.data.length !== 0) {
            setData(r.data)
          }
        } else setData([])
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <Layout>
      <HeaderC
        title='Thống kê mặt hàng'
        rightNameIcon={'color-filter-outline'}
        onClickRight={() => setFIlter(!filter)}
      />
      {data === null && (
        <ActivityIndicator size={30} color={Light.blue_faint} />
      )}
      {data && (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ViewCore width={screen_width * 1.5} margin={10}>
              {filter && <BoxFilter />}
              <TableProduct data={formatDataProduct(data)} />
              <ViewCore >
                <StaticDetailProduct data={formatDataProduct2(data)} />
              </ViewCore>
            </ViewCore>
          </ScrollView>
        </ScrollView>
      )}
    </Layout>
  )
}
const BoxFilter = () => {
  return (
    <>
      <ViewCore row marginVertical={10} centerHorizontal>
        <ButtonBasic title='Tên' />
        <ButtonBasic title='Giá' />
        <ButtonBasic title='Số lượng' />
        <ButtonBasic title='Kho' />
        <ButtonBasic title='Bán' />
      </ViewCore>
      <ViewCore row marginVertical={10}>
        <ButtonBasic title='Tăng' />
        <ButtonBasic title='Giảm' marginLeft={20} />
      </ViewCore>
    </>
  )
}
class TableProduct extends PureComponent {
  render () {
    return (
      <Table
        borderStyle={{
          borderWidth: 2,
          borderColor: '#c8e1ff',
          width: screen_width * 2,
        }}>
        <Row
          data={['STT', 'MLH','MH', 'Tên SP', 'Size', 'Giá', 'Kho', 'Bán']}
          flexArr={[1, 2,2, 4, 1, 3, 2, 2]}
          style={styles.head}
          textStyle={styles.text}
        />
        {this.props.data.map((item, index) => (
          <Row
            key={index}
            data={item}
            flexArr={[1,2, 2, 4, 1, 3, 2, 2]}
            style={styles.row}
            textStyle={styles.text}
          />
        ))}
      </Table>
    )
  }
}

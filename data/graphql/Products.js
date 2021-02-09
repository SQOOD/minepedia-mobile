import { gql } from '@apollo/client';

const Products = gql`
  query Products($sort:SortOrder $take:Int $category:Category $search:String) {
    products(orderBy:[{price:$sort}] take:$take where:{category:{equals:$category} name:{contains:$search}}){
      id
      category
      customizable
      details
      tkdn
      price
      name
      country
      hscode
      imageURL
      approved
      profile{
        name
        companyType
        address
        phone
        imageURL
        district
        province
        vendor{
          email
        }
      }
      log{
        id
        contentStatus
        description
        admin{
          nik
        }
      }
      description
      minPurchase
      productID
      certificate
      unit
    }
  }
`
export default Products
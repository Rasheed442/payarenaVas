import { faker } from '@faker-js/faker'
import numeral from 'numeral'
import cookie from 'cookie'

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export const normalizedDeal = (items) => {
  return (
    items?.length &&
    items
      ?.filter((i) => i.status == 'active')
      .map((i) => ({
        title: i.name,
        img: faker.image.imageUrl(640, 480, 'fashion', true),
        discount: i.discount,
        price: i.price || 50000,
        discountPrice: i.discount,
        featured: i.is_featured,
        id: i.id,
      }))
  )
}
export const normalizedTopSelling = (items) => {
  return (
    items?.length &&
    items.slice(0, 3).map((i) => ({
      title: i.name,
      img: i.image,
      discount: i.discount,
      price: i.price || 50000,
      discountPrice: i.discount,
      featured: i.is_featured,
      id: i.id,
    }))
  )
}
export const normalizedNewArrivals = (items) => {
  return (
    items?.length &&
    items.slice(0, 3).map((i) => ({
      title: i.name,
      img: i.image,
      discount: i.discount,
      price: i.price || 50000,
      discountPrice: i.discount,
      featured: i.is_featured,
      id: i.id,
    }))
  )
}
export const normalizeShipping = (shipping) => {
  let items = []

  shipping?.length &&
    shipping.map((i) => {
      const shipment =
        i.shipping_information?.length &&
        i.shipping_information?.map((s) => ({
          ...s,
          store_name: i.store_name,
        }))
      items = [...items, ...shipment]
    })

  return items
}
export function formatNumber(value, format = '', rounding = Math.floor) {
  return numeral(value).format(format, rounding)
}

export const constants = {
  primaryColor: '#FF993A',
  brandColor: '#00B3FE',
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}

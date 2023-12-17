export interface User {
  /**
   * 地址
   */
  address?: string
  /**
   * 头像
   */
  avatarUrl?: string
  /**
   * 个人简介
   */
  biography?: string
  /**
   * 出生日期
   */
  birthDate: Date
  /**
   * 城市
   */
  city?: string
  /**
   * 国家
   */
  country?: string
  /**
   * 创建时间
   */
  createdAt: Date
  /**
   * 创建人
   */
  createdBy: number | null
  /**
   * 邮箱
   */
  email?: string
  /**
   * 是否启用
   */
  enabled: boolean
  /**
   * 名
   */
  firstName?: string
  /**
   * 性别
   */
  gender?: string
  /**
   * 全名
   */
  fullName: string
  /**
   * ID
   */
  id: number
  /**
   * 姓
   */
  lastName?: string
  /**
   * 中间名
   */
  middleName?: string
  /**
   * 昵称
   */
  nickName?: string
  /**
   * 手机号
   */
  phoneNumber?: string
  /**
   * 个人主页
   */
  profile?: string
  /**
   * 省份
   */
  province?: string
  /**
   * 更新时间
   */
  updatedAt: Date
  /**
   * 更新人
   */
  updatedBy: number | null
  /**
   * 用户名
   */
  username: string
  /**
   * 个人网站
   */
  website?: string
}

export interface CreateUserModel {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
}

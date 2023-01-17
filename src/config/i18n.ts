import i18n from '@/i18n';
/**
 * 国际化add 新建  edit  编辑
 * @returns { string }
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */

export const setModalTitleType = (type: string) => {
  const { t } = i18n.global;
  let name = type == "add" ? t("base.新建") : t("base.编辑")
  return name;
};

/**
 * 国际化placeholder 请选择 请输入
 * 1 input输入规则  blur
 * 2 select输入规则  change
 * @returns { string }
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */
export const getPlaceholder = (type: number) => {
  const { t } = i18n.global;
  let name;
  switch (type) {
    case 1:
      name = t('base.pleaseEnter');
      break;
    case 2:
      name = t('base.pleaseSelect');
      break;
    case 3:
      name = [t('base.startTime'), t('base.endTime')];
      break;
  }
  return name;
};

/**
 * 国际化表单效验的规则 请选择 请输入
 * 1 input输入规则  blur
 * 2 select输入规则  change
 * @type {string} change  blur
 * @returns {Object}
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */
export const setRules = (type: number) => {
  const { t } = i18n.global;
  const obj = {
    required: true,
    message: type === 1 ? t('base.pleaseEnter') : t('base.pleaseSelect'),
    trigger: type === 1 ? 'blur' : 'change'
  };
  return obj;
};

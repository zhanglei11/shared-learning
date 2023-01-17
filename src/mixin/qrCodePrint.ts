
import { defineComponent, ref } from 'vue'
//打印二维码
import { getLodop } from "@/utils/LodopFuncs.js";
export default defineComponent({
  name: 'qrCodePrint',
  setup() {
    const LODOP = ref()
    const handleSubmit = async (value:string) => {
      LODOP.value = getLodop();
      LODOP.value.SET_PRINT_PAGESIZE(1, 900, 700);
      LODOP.value.ADD_PRINT_BARCODE(28, 88, 100, 100, "QRCode", value); //设置条码位置、宽高、字体、值
      LODOP.value.PRINT();
    };

    const handlePreview = async (value: string) => {
      LODOP.value = getLodop();
      LODOP.value.SET_PRINT_PAGESIZE(1, 900, 700);
      LODOP.value.ADD_PRINT_BARCODE(28, 88, 100
        , 100, "QRCode", value); //设置条码位置、宽高、字体、值
      LODOP.value.PREVIEW();
    };
    /**
   * 
   * ADD_PRINT_BARCODE(Top,Left,Width,Height,BarCodeType,BarCodeValue);
   * 顶，左，宽，高，条码的类型（规制）名称，条码值
    条码的类型 ：
    128A
    128B
    128C
    128Auto
    EAN8
    EAN13	EAN128A
    EAN128B
    EAN128C
    Code39
    39Extended
    2_5interleaved	2_5industrial
    2_5matrix
    UPC_A
    UPC_E0
    UPC_E1
    UPCsupp2	UPCsupp5
    Code93
    93Extended
    MSI
    PostNet
    Codabar	QRCode
    PDF417
  */
    const AddPrintContent = (value: string) => {
      LODOP.value.ADD_PRINT_BARCODE(28, 88, 100, 100, "QRCode", value); //设置条码位置、宽高、字体、值
    };

    const init = () => {
      LODOP.value = getLodop();
      LODOP.value.SET_PRINT_PAGESIZE(1, 900, 700);
    };
    return {
      handleSubmit,
      handlePreview
    }
  }
})


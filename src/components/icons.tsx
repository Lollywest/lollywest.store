import {
  AlarmClock,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  Circle,
  Copy,
  CreditCard,
  Crop,
  DollarSign,
  Download,
  Edit,
  Eye,
  EyeOff,
  FileTerminal,
  Filter,
  Footprints,
  HardHat,
  Image,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Plus,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  SlidersHorizontal,
  Star,
  SunMedium,
  Trash,
  Twitter,
  UploadCloud,
  User,
  Volume2,
  VolumeX,
  Wallet,
  X,
  type LucideIcon,
  type LucideProps,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  star: Star,
  twitter: Twitter,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronUpDown: ChevronsUpDown,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  menu: Menu,
  verticalThreeDots: MoreVertical,
  horizontalThreeDots: MoreHorizontal,
  verticalSliders: Sliders,
  horizontalSliders: SlidersHorizontal,
  circle: Circle,
  check: Check,
  add: Plus,
  addCircle: PlusCircle,
  remove: Minus,
  view: Eye,
  hide: EyeOff,
  trash: Trash,
  edit: Edit,
  crop: Crop,
  reset: RefreshCw,
  send: Send,
  copy: Copy,
  downlaod: Download,
  warning: AlertTriangle,
  search: Search,
  filter: Filter,
  alarm: AlarmClock,
  calendar: CalendarDays,
  user: User,
  terminal: FileTerminal,
  settings: Settings,
  logout: LogOut,
  volumne: Volume2,
  volumneMute: VolumeX,
  message: MessageSquare,
  billing: CreditCard,
  wallet: Wallet,
  dollarSign: DollarSign,
  cart: ShoppingCart,
  product: Package,
  store: ShoppingBag,
  chart: BarChart3,
  upload: UploadCloud,
  placeholder: Image,
  clothing: Shirt,
  shoes: Footprints,
  accessories: HardHat,
  
  logo: (props: LucideProps) => (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 24 24"
    //   strokeWidth="1.5"
    //   stroke="currentColor"
    //   fill="none"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    //   {...props}
    // >
    //   <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //   <circle cx="7" cy="15" r="2" />
    //   <circle cx="17" cy="15" r="2" />
    //   <path d="M3 9a2 1 0 0 0 2 1h14a2 1 0 0 0 2 -1" />
    // </svg>

    // <svg width="36.72px" height="34.74px" viewBox="0 0 204 193" version="1.1" xmlns="http://www.w3.org/2000/svg" >
      
    // <title>launch</title>
    // <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    //     <g id="launch" transform="translate(0.5, 0.5)" fill-rule="nonzero">
    //         <g id="lollywest" fill="#FFFFFF" stroke="#FFFFFF">
    //             <ellipse id="Oval" cx="101.5" cy="96" rx="101.5" ry="96"></ellipse>
    //         </g>
    //         <g id="martian-free-svgrepo-com" transform="translate(35, 22)" fill="#000000" stroke="#000000" stroke-width="1.5625">
    //             <path d="M59.6642336,99.3888162 L59.6642336,124.036433 C59.6642336,134.505547 50.9198023,149 34.5292756,149 C31.6765054,149 29.3430657,146.906177 29.3430657,144.352002 C29.3430657,141.797827 31.6765054,139.712957 34.5292756,139.712957 C44.8313763,139.712957 49.2866526,129.329617 49.2866526,124.036433 L49.2866526,96 C52.1697441,97.4619216 55.5666826,98.6939558 59.6642336,99.3888162 Z" id="Path"></path>
    //             <path d="M38.1459854,87.4319475 L38.1459854,110.234573 C38.1459854,120.017505 29.5732339,128 19.0607656,128 C8.54328113,128 0,120.017797 0,110.234573 C0,100.451349 8.54328113,92.50124 19.0607656,92.50124 C21.8579456,92.50124 24.1014582,94.5890591 24.1014582,97.1921225 C24.1014582,99.7724289 21.8579456,101.883005 19.0607656,101.883005 C14.1178896,101.883005 10.0813852,105.639387 10.0813852,110.234573 C10.0813852,114.857185 14.1178896,118.613567 19.0607656,118.613567 C24.0230796,118.613567 28.0595839,114.857185 28.0595839,110.234573 L28.0595839,88.0425966 C28.5151211,87.878337 28.9904097,87.6869438 29.470401,87.4771699 C32.3459597,86.2552881 34.0361185,86 34.9421766,86 C35.8777051,86.0005835 36.6812437,86.3562363 38.1459854,87.4319475 Z" id="Path"></path>
    //             <path d="M104.656934,144.295146 C104.656934,146.880565 102.318731,149 99.4664472,149 C83.0787096,149 74.3357664,134.328245 74.3357664,123.731067 L74.3357664,98.6632615 C78.4577759,97.8912023 81.8544589,96.5528884 84.7115814,95 L84.7115814,123.731067 C84.7115814,129.089 89.1712595,139.599354 99.4664472,139.599354 C102.318731,139.599646 104.656934,141.710019 104.656934,144.295146 Z" id="Path"></path>
    //             <path d="M134,110.234326 C134,120.017395 125.456718,128 114.94425,128 C104.431782,128 95.8540146,120.017686 95.8540146,110.234326 L95.8540146,87.0074538 C96.9415978,86.2552917 97.6419901,86 98.4257778,86 C99.3368516,86 101.021995,86.2552917 103.897553,87.4771905 C104.578507,87.7599077 105.259462,88.042625 105.940416,88.2748675 L105.940416,110.234618 C105.940416,114.857294 109.97692,118.613728 114.94425,118.613728 C119.88211,118.613728 123.918615,114.857294 123.918615,110.234618 C123.918615,105.639368 119.88211,101.882934 114.94425,101.882934 C112.142054,101.882934 109.898542,99.7723285 109.898542,97.1919863 C109.898542,94.5888867 112.142054,92.5010385 114.94425,92.5010385 C125.456718,92.5007468 134,100.451258 134,110.234326 Z" id="Path"></path>
    //             <path d="M126.157716,72.2744346 C115.056376,59.3849414 114.061578,66.1405473 114.061578,44.1356842 C114.061578,22.1400445 96.5381731,0 66.0218615,0 C35.5156366,0 17.9821459,22.1400445 17.9821459,44.1356842 C17.9821459,66.1405473 16.9873469,59.3849414 5.88600739,72.2744346 C-0.832038219,80.0748854 10.6339978,88.6901709 24.7049197,82.8580636 C46.2031069,73.9407099 44.5236743,94 66.0218615,94 C87.5250921,94 85.8456595,73.9407099 107.343847,82.8580636 C121.410041,88.6901709 132.875762,80.0748854 126.157716,72.2744346 Z M66.0218615,66.9692173 C53.590656,66.9692173 43.5187886,57.7546953 43.5187886,46.3876489 C43.5187886,35.0206025 53.5909712,25.8057923 66.0218615,25.8057923 C78.4527518,25.8057923 88.5347059,35.0203143 88.5347059,46.3873607 C88.5347059,57.7544071 78.4530671,66.9692173 66.0218615,66.9692173 Z" id="Shape"></path>
    //         </g>
    //         <rect id="Rectangle" stroke="#000000" fill="#000000" x="65" y="44" width="73" height="52" rx="8"></rect>
    //     </g>
    //   </g>
      
    // </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="150" zoomAndPan="magnify" viewBox="0 0 750 149.999998" height="30" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="22477f324f"><path d="M 4.425781 2.121094 L 156.675781 2.121094 L 156.675781 147.621094 L 4.425781 147.621094 Z M 4.425781 2.121094 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#22477f324f)"><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 4.80688, 2.499778)" fill-opacity="1" fill="#ffffff" fill-rule="nonzero" stroke-linejoin="miter" d="M 203.000875 95.998481 C 203.000875 42.965532 157.545776 -0.010069 101.501586 -0.010069 C 45.452161 -0.010069 -0.00293832 42.965532 -0.00293832 95.998481 C -0.00293832 149.036612 45.452161 192.007031 101.501586 192.007031 C 157.545776 192.007031 203.000875 149.036612 203.000875 95.998481 Z M 203.000875 95.998481 " stroke="#ffffff" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4"/></g><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 30.921647, 19.080451)" fill-opacity="1" fill="#000000" fill-rule="nonzero" stroke-linejoin="miter" d="M 59.661431 99.404547 L 59.661431 124.053081 C 59.661431 134.509406 50.925301 148.996961 34.526081 148.996961 C 31.668125 148.996961 29.344074 146.898442 29.344074 144.343948 C 29.344074 141.784273 31.668125 139.722024 34.526081 139.722024 C 44.816814 139.722024 49.302652 129.327877 49.302652 124.053081 L 49.302652 95.995101 C 52.155373 97.471837 55.578638 98.684315 59.661431 99.404547 Z M 59.661431 99.404547 " stroke="#000000" stroke-width="1.563" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 30.921647, 19.080451)" fill-opacity="1" fill="#000000" fill-rule="nonzero" stroke-linejoin="miter" d="M 38.143017 87.440397 L 38.143017 110.218398 C 38.143017 120.021851 29.579619 127.985861 19.053341 127.985861 C 8.527062 127.985861 -0.00492938 120.021851 -0.00492938 110.218398 C -0.00492938 100.451216 8.527062 92.487206 19.053341 92.487206 C 21.843249 92.487206 24.099254 94.585725 24.099254 97.207579 C 24.099254 99.762073 21.843249 101.896863 19.053341 101.896863 C 14.106879 101.896863 10.086898 105.632745 10.086898 110.218398 C 10.086898 114.840322 14.106879 118.612475 19.053341 118.612475 C 24.031208 118.612475 28.051189 114.840322 28.051189 110.218398 L 28.051189 88.031091 C 28.517046 87.865282 28.982903 87.699473 29.480167 87.471486 C 32.332888 86.259008 34.028817 85.99475 34.955297 85.99475 C 35.887012 85.99475 36.682633 86.357457 38.143017 87.440397 Z M 38.143017 87.440397 " stroke="#000000" stroke-width="1.563" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 30.921647, 19.080451)" fill-opacity="1" fill="#000000" fill-rule="nonzero" stroke-linejoin="miter" d="M 104.650674 144.307677 C 104.650674 146.867353 102.326622 148.996961 99.468667 148.996961 C 83.069447 148.996961 74.33855 134.312508 74.33855 123.726644 L 74.33855 98.648044 C 78.45275 97.896722 81.839374 96.549525 84.69733 95.010611 L 84.69733 123.726644 C 84.69733 129.09989 89.177934 139.587304 99.468667 139.587304 C 102.326622 139.587304 104.650674 141.722094 104.650674 144.307677 Z M 104.650674 144.307677 " stroke="#000000" stroke-width="1.563" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 30.921647, 19.080451)" fill-opacity="1" fill="#000000" fill-rule="nonzero" stroke-linejoin="miter" d="M 133.999677 110.218398 C 133.999677 120.021851 125.467685 127.985861 114.941407 127.985861 C 104.420362 127.985861 95.85173 120.021851 95.85173 110.218398 L 95.85173 87.015512 C 96.94571 86.259008 97.647113 85.99475 98.442734 85.99475 C 99.337808 85.99475 101.033737 86.259008 103.886458 87.471486 C 104.582627 87.766833 105.24739 88.031091 105.943558 88.259079 L 105.943558 110.218398 C 105.943558 114.840322 109.963539 118.612475 114.941407 118.612475 C 119.893102 118.612475 123.907849 114.840322 123.907849 110.218398 C 123.907849 105.632745 119.893102 101.896863 114.941407 101.896863 C 112.156732 101.896863 109.895493 99.762073 109.895493 97.207579 C 109.895493 94.585725 112.156732 92.487206 114.941407 92.487206 C 125.467685 92.487206 133.999677 100.451216 133.999677 110.218398 Z M 133.999677 110.218398 " stroke="#000000" stroke-width="1.563" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 30.921647, 19.080451)" fill-opacity="1" fill="#000000" fill-rule="nonzero" stroke-linejoin="miter" d="M 126.163854 72.263699 C 115.040859 59.382418 114.046333 66.13395 114.046333 44.138359 C 114.046333 22.142769 96.547899 -0.0134489 66.03687 -0.0134489 C 35.520607 -0.0134489 17.990767 22.142769 17.990767 44.138359 C 17.990767 66.13395 16.996241 59.382418 5.873246 72.263699 C -0.837191 80.0619 10.620802 88.683964 24.69597 82.849562 C 46.214385 73.932151 44.518456 93.995031 66.03687 93.995031 C 87.518645 93.995031 85.859355 73.932151 107.34113 82.849562 C 121.416298 88.683964 132.874291 80.0619 126.163854 72.263699 Z M 66.03687 66.983721 C 53.584351 66.983721 43.523929 57.739873 43.523929 46.402688 C 43.523929 35.02405 53.584351 25.816473 66.03687 25.816473 C 78.45275 25.816473 88.544577 35.02405 88.544577 46.402688 C 88.544577 57.739873 78.45275 66.983721 66.03687 66.983721 Z M 66.03687 66.983721 " stroke="#000000" stroke-width="1.563" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(0.746272, 0, 0, 0.75388, 4.80688, 2.499778)" fill-opacity="1" fill="#000000" fill-rule="nonzero" stroke-linejoin="miter" d="M 73.011016 44.012201 L 129.986921 44.012201 C 134.404713 44.012201 137.990243 47.587456 137.990243 52.012482 L 137.990243 88.003382 C 137.990243 92.428408 134.404713 95.998481 129.986921 95.998481 L 73.011016 95.998481 C 68.593224 95.998481 65.007694 92.428408 65.007694 88.003382 L 65.007694 52.012482 C 65.007694 47.587456 68.593224 44.012201 73.011016 44.012201 Z M 73.011016 44.012201 " stroke="#000000" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4"/><g fill="#ffffff" fill-opacity="1"><g transform="translate(178.020371, 121.033366)"><g><path d="M 28.859375 -17.34375 L 63.421875 -17.34375 L 63.421875 0 L 8.140625 0 L 8.140625 -81.46875 L 28.859375 -81.46875 Z M 28.859375 -17.34375 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(243.17866, 121.033366)"><g><path d="M 37.125 -63.421875 C 47.363281 -63.421875 55.625 -60.492188 61.90625 -54.640625 C 68.195312 -48.785156 71.34375 -41.046875 71.34375 -31.421875 C 71.34375 -21.796875 68.195312 -14.035156 61.90625 -8.140625 C 55.625 -2.242188 47.363281 0.703125 37.125 0.703125 C 26.800781 0.703125 18.5 -2.242188 12.21875 -8.140625 C 5.9375 -14.035156 2.796875 -21.796875 2.796875 -31.421875 C 2.796875 -41.046875 5.9375 -48.785156 12.21875 -54.640625 C 18.5 -60.492188 26.800781 -63.421875 37.125 -63.421875 Z M 37.125 -47.484375 C 32.9375 -47.484375 29.539062 -45.96875 26.9375 -42.9375 C 24.34375 -39.914062 23.046875 -36 23.046875 -31.1875 C 23.046875 -26.300781 24.34375 -22.363281 26.9375 -19.375 C 29.539062 -16.382812 32.9375 -14.890625 37.125 -14.890625 C 41.238281 -14.890625 44.59375 -16.382812 47.1875 -19.375 C 49.789062 -22.363281 51.09375 -26.300781 51.09375 -31.1875 C 51.09375 -36 49.789062 -39.914062 47.1875 -42.9375 C 44.59375 -45.96875 41.238281 -47.484375 37.125 -47.484375 Z M 37.125 -47.484375 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(317.296209, 121.033366)"><g><path d="M 28.75 0 L 8.609375 0 L 8.609375 -86.34375 L 28.75 -86.34375 Z M 28.75 0 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(354.645853, 121.033366)"><g><path d="M 28.75 0 L 8.609375 0 L 8.609375 -86.34375 L 28.75 -86.34375 Z M 28.75 0 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(391.995497, 121.033366)"><g><path d="M 68.3125 -62.71875 L 41.203125 6.515625 C 36.546875 17.835938 28.472656 23.5 16.984375 23.5 C 10.316406 23.5 4.226562 21.367188 -1.28125 17.109375 L 7.09375 3.375 C 9.882812 5.625 12.640625 6.75 15.359375 6.75 C 18.929688 6.75 21.53125 5.082031 23.15625 1.75 L 24.671875 -1.390625 L -1.390625 -62.71875 L 19.3125 -62.71875 L 34.6875 -21.0625 L 48.296875 -62.71875 Z M 68.3125 -62.71875 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(459.480858, 121.033366)"><g><path d="M 86.9375 0 L 67.03125 0 L 54.703125 -39.796875 L 42.359375 0 L 22.34375 0 L -0.578125 -62.71875 L 19.90625 -62.71875 L 32.8125 -19.3125 L 45.390625 -62.71875 L 64.59375 -62.71875 L 77.5 -19.3125 L 90.1875 -62.71875 L 109.859375 -62.71875 Z M 86.9375 0 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(568.504612, 121.033366)"><g><path d="M 35.5 -63.421875 C 46.351562 -63.421875 54.515625 -60.082031 59.984375 -53.40625 C 65.460938 -46.738281 67.847656 -37.585938 67.140625 -25.953125 L 23.046875 -25.953125 C 24.054688 -22.222656 25.835938 -19.347656 28.390625 -17.328125 C 30.953125 -15.316406 34.097656 -14.3125 37.828125 -14.3125 C 43.566406 -14.3125 48.566406 -16.445312 52.828125 -20.71875 L 63.421875 -10.359375 C 56.671875 -2.984375 47.554688 0.703125 36.078125 0.703125 C 25.910156 0.703125 17.820312 -2.207031 11.8125 -8.03125 C 5.800781 -13.851562 2.796875 -21.570312 2.796875 -31.1875 C 2.796875 -40.882812 5.800781 -48.679688 11.8125 -54.578125 C 17.820312 -60.472656 25.71875 -63.421875 35.5 -63.421875 Z M 22.6875 -36.78125 L 47.828125 -36.78125 C 47.828125 -40.582031 46.722656 -43.644531 44.515625 -45.96875 C 42.304688 -48.289062 39.378906 -49.453125 35.734375 -49.453125 C 32.316406 -49.453125 29.441406 -48.304688 27.109375 -46.015625 C 24.785156 -43.734375 23.3125 -40.65625 22.6875 -36.78125 Z M 22.6875 -36.78125 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(638.549731, 121.033366)"><g><path d="M 30.484375 -63.65625 C 39.722656 -63.65625 48.335938 -61.289062 56.328125 -56.5625 L 49.453125 -43.53125 C 41.703125 -47.71875 35.109375 -49.8125 29.671875 -49.8125 C 25.554688 -49.8125 23.5 -48.375 23.5 -45.5 C 23.5 -43.945312 24.625 -42.644531 26.875 -41.59375 C 29.125 -40.550781 31.878906 -39.601562 35.140625 -38.75 C 38.398438 -37.894531 41.640625 -36.828125 44.859375 -35.546875 C 48.078125 -34.265625 50.8125 -32.226562 53.0625 -29.4375 C 55.3125 -26.644531 56.4375 -23.234375 56.4375 -19.203125 C 56.4375 -12.921875 53.992188 -8.015625 49.109375 -4.484375 C 44.222656 -0.953125 37.863281 0.8125 30.03125 0.8125 C 18.9375 0.8125 9.546875 -2.132812 1.859375 -8.03125 L 8.265625 -20.828125 C 15.628906 -15.628906 23.035156 -13.03125 30.484375 -13.03125 C 35.066406 -13.03125 37.359375 -14.46875 37.359375 -17.34375 C 37.359375 -18.96875 36.25 -20.320312 34.03125 -21.40625 C 31.820312 -22.5 29.128906 -23.472656 25.953125 -24.328125 C 22.773438 -25.179688 19.59375 -26.242188 16.40625 -27.515625 C 13.226562 -28.796875 10.53125 -30.796875 8.3125 -33.515625 C 6.101562 -36.234375 5 -39.644531 5 -43.75 C 5 -50.039062 7.363281 -54.929688 12.09375 -58.421875 C 16.832031 -61.910156 22.960938 -63.65625 30.484375 -63.65625 Z M 30.484375 -63.65625 "/></g></g></g><g fill="#ffffff" fill-opacity="1"><g transform="translate(698.239332, 121.033366)"><g><path d="M 44.578125 -17.34375 L 48.53125 -3.375 C 43.644531 -0.5 38.054688 0.9375 31.765625 0.9375 C 25.554688 0.9375 20.53125 -0.785156 16.6875 -4.234375 C 12.851562 -7.691406 10.9375 -12.601562 10.9375 -18.96875 L 10.9375 -46.671875 L 2.21875 -46.671875 L 2.21875 -59.8125 L 10.9375 -59.8125 L 10.9375 -77.265625 L 30.953125 -77.265625 L 30.953125 -59.9375 L 47.359375 -59.9375 L 47.359375 -46.671875 L 30.953125 -46.671875 L 30.953125 -22.109375 C 30.953125 -19.703125 31.4375 -17.9375 32.40625 -16.8125 C 33.375 -15.6875 34.832031 -15.164062 36.78125 -15.25 C 38.632812 -15.25 41.234375 -15.945312 44.578125 -17.34375 Z M 44.578125 -17.34375 "/></g></g></g></svg>

  ),
  nextjs: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="discord"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
      <path
        fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      />
    </svg>
  ),
  discord: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      />
    </svg>
  ),
}

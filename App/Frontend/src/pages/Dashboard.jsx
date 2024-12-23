import Layout from "../pages/Layout/Layout"
import { FcAbout, FcInspection, FcDataProtection, FcLink } from "react-icons/fc";

export function Dashboard() {

    return (
        <Layout>
            <p className="mx-5 text-2xl text-slate-700 font-bold">Dashboard</p>
            <div className="grid grid-cols-4 gap-2">
                <div className="shadow-lg shadow-gray-500/50 p-4 rounded-lg h-28 w-full">
                    <p className="text-md text-slate-500 font-bold">Alertas |</p>
                    <div className="flex items-center text-center mt-1">
                        <FcAbout className="text-4xl"/>
                        <div className="mx-7">
                            <p className="text-3xl font-bold">5</p>
                            <p className="text-sm font-semibold text-gray-500">Ver más</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-lg shadow-gray-500/50 p-4 rounded-lg h-28 w-full">
                    <p className="text-md text-slate-500 font-bold">Acciones realizadas |</p>
                    <div className="flex items-center text-center mt-1">
                        <FcInspection className="text-4xl"/>
                        <div className="mx-7">
                            <p className="text-3xl font-bold">5</p>
                            <p className="text-sm font-semibold text-gray-500">Ver más</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-lg shadow-gray-500/50 p-4 rounded-lg h-28 w-full">
                    <p className="text-md text-slate-500 font-bold">Auditorías a bases de datos |</p>
                    <div className="flex items-center text-center mt-1">
                        <div className="bg-gray-900/60 p-2 rounded-full"><FcDataProtection className="text-4xl"/></div>
                        <div className="mx-7">
                            <p className="text-3xl font-bold">0</p>
                            <p className="text-sm font-semibold text-gray-500">Ver más</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-lg shadow-gray-500/50 p-4 rounded-lg h-28 w-full">
                    <p className="text-md text-slate-500 font-bold">Conexiones |</p>
                    <div className="flex items-center text-center mt-1">
                        <FcLink className="text-4xl"/>
                        <div className="mx-7">
                            <p className="text-3xl font-bold">0</p>
                            <p className="text-sm font-semibold text-gray-500">Ver más</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="bg-green-300 w-4/5 h-64 mt-5 rounded-lg">
                    <p className="text-xl font-bold text-center pt-2">Pronto sabré que poner aquí</p>
                </div>
                <div className="bg-green-300 w-1/5 h-64 mt-5 rounded-lg">
                    <p className="text-xl font-bold text-center pt-2">Acciones recientes</p>
                </div>
            </div>
        </Layout>
    )
}

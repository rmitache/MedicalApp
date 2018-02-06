using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    interface IMedicineFactorRecordService
    {
        // Fields

        // Constructor

        // Public methods
        //public UserRoute AddMedicineFactorRecords(UserRoute userRoute, int userID)
        //{
        //    T_fe4_user_route entity = _routeBloFactory.Convert_ToUserRouteDataEntity(userRoute, userID);
        //    _userRouteRepository.AddNewUserRoute(entity);

        //    UserRoute addedBlo = _routeBloFactory.Convert_ToUserRouteBLO(entity);

        //    //Return the new blo with persistence information
        //    return addedBlo;
        //}
        //public T_fe4_user_route Convert_ToUserRouteDataEntity(UserRoute blo, int userID)
        //{
        //    // Create the parent entity
        //    var entity = new T_fe4_user_route()
        //    {
        //        id = blo.ID,
        //        name = blo.Name,
        //        type = (byte)blo.Type,
        //        user_id = userID
        //    };

        //    // Add child entities
        //    foreach (SystemRoute systemRouteBlo in blo.SystemRoutes)
        //    {
        //        T_fe4_system_route_ref_to_user_route systemRouteEntity = Convert_ToSystemRouteDataEntity(systemRouteBlo);
        //        systemRouteEntity.user_route_id = entity.id;

        //        entity.T_fe4_system_route_ref_to_user_route.Add(systemRouteEntity);
        //    }

        //    return entity;
        //}

    }


}

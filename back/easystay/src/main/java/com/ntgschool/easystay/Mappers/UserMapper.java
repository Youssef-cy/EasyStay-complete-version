package com.ntgschool.easystay.Mappers;

import com.ntgschool.easystay.Dtos.Response.UserResponse;
import com.ntgschool.easystay.Entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserDto(User user);
}

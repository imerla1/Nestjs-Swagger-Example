import { IsBoolean, IsOptional } from "class-validator";

class PostHelloQueryDTO {
	@IsOptional()
	@IsBoolean()
	public useExclamation?: boolean;
}

export default PostHelloQueryDTO;

